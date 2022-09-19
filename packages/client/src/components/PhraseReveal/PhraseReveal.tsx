import "./styles.css";

export interface PhraseRevealProps {
  phrase: string;
}

export function PhraseReveal({ phrase }: PhraseRevealProps) {
  return <span className="phrase-reveal">{phrase}</span>;
}
