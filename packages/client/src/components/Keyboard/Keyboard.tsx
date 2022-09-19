import { KeyboardKey } from "../KeyboardKey";
import { keyboardKeys } from "./keyboardKeys";
import "./styles.css";

export interface KeyboardProps {
  disableKeys: string[];
  onKeyPress: (key: string) => void;
}

export function Keyboard({ disableKeys, onKeyPress }: KeyboardProps) {
  return (
    <div className="keyboard">
      {keyboardKeys.map((row, index) => (
        <div className="row" key={index}>
          {row.map((key) => (
            <KeyboardKey
              keyCode={key.keyCode}
              keyChar={key.key}
              disabled={disableKeys.includes(key.key)}
              onClick={() => onKeyPress(key.keyCode)}
              key={key.keyCode}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
