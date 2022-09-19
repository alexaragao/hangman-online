import "./styles.css";

export interface KeyboardKeyProps {
  keyChar: string;
  keyCode?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function KeyboardKey({
  disabled = false,
  keyChar,
  keyCode,
  onClick,
}: KeyboardKeyProps) {
  return (
    <button className="keyboard-key" onClick={onClick} disabled={disabled}>
      {keyChar}
    </button>
  );
}
