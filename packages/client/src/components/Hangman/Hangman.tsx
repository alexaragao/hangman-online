export interface HangmanProps {
  badGuesses: number;
}

export function Hangman({ badGuesses }: HangmanProps) {
  return (
    <svg
      width="228"
      height="248"
      viewBox="0 0 228 248"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42.3136 50.3504L90.3048 2.35924L101.617 13.6712L53.6256 61.6624L42.3136 50.3504Z"
        fill="#AD6327"
      />
      <path d="M56 240H40V0H192V48H176V16H56V240Z" fill="#D3843D" />
      <path d="M0 232H104V248H0V232Z" fill="#AD6327" />
      {badGuesses > 1 && (
        <rect x="176" y="72" width="16" height="80" fill="#F9BB4B" />
      )}
      {badGuesses > 2 && (
        <rect
          x="187.86"
          y="88"
          width="16"
          height="48"
          transform="rotate(75 187.86 88)"
          fill="#F9BB4B"
        />
      )}
      {badGuesses > 3 && (
        <rect
          width="16"
          height="48"
          transform="matrix(-0.258819 0.965926 0.965926 0.258819 180.141 88)"
          fill="#F9BB4B"
        />
      )}
      {badGuesses > 4 && (
        <rect
          x="178.69"
          y="140"
          width="16"
          height="54"
          transform="rotate(45 178.69 140)"
          fill="#F9BB4B"
        />
      )}
      {badGuesses > 5 && (
        <rect
          width="16"
          height="54"
          transform="matrix(-0.707107 0.707107 0.707107 0.707107 189.314 141)"
          fill="#F9BB4B"
        />
      )}
      {badGuesses > 0 && (
        <path
          d="M184 88C197.255 88 208 77.2548 208 64C208 50.7452 197.255 40 184 40C170.745 40 160 50.7452 160 64C160 77.2548 170.745 88 184 88Z"
          fill="#FFD782"
        />
      )}
    </svg>
  );
}
