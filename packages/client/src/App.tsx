import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { Hangman } from "./components/Hangman";
import { Keyboard } from "./components/Keyboard";
import { PhraseReveal } from "./components/PhraseReveal";

type RoomStatus = {
  charsGuessed: string[];
  numErrors: number;
  phrase: string;
};

const socket = io("http://localhost:5000");

function App() {
  const [{ charsGuessed, numErrors, phrase }, setRoomsStatus] =
    useState<RoomStatus>({
      charsGuessed: [],
      numErrors: 0,
      phrase: "",
    });

  const handleKeyPress = useCallback((keyCode: string) => {
    if (/Key[A-Z]/.test(keyCode)) {
      const char = keyCode.at(-1)!;

      setRoomsStatus((old) => {
        if (!old.charsGuessed.includes(char)) {
          socket.emit("char guess", { char });
        }
        return old;
      });
    }
  }, []);

  const keyPressListener = useCallback(
    (event: KeyboardEvent) => {
      const key = event.code;
      handleKeyPress(key);
    },
    [handleKeyPress]
  );

  useEffect(() => {
    socket.connect();

    socket.on("room change", (data: RoomStatus) => {
      setRoomsStatus(data);
    });

    window.addEventListener("keypress", keyPressListener);

    return () => {
      socket.disconnect();
      window.removeEventListener("keypress", keyPressListener);
    };
  }, []);

  return (
    <div className="App">
      <Hangman badGuesses={numErrors} />

      <PhraseReveal phrase={phrase} />

      <Keyboard onKeyPress={handleKeyPress} disableKeys={charsGuessed} />
    </div>
  );
}

export default App;
