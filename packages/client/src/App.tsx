import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

type RoomStatus = {
  charsGuessed: string[];
  numErrors: number;
  phrase: string;
};

const socket = io("http://localhost:5000");

function App() {
  const [roomStatus, setRoomsStatus] = useState<RoomStatus>({
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
      <p>Hangman Online</p>
      <p>Phrase: {roomStatus.phrase}</p>
      <p>Errors: {roomStatus.numErrors}</p>
      <p>CharsGuessed: {Array.from(roomStatus.charsGuessed).join(", ")}</p>
    </div>
  );
}

export default App;
