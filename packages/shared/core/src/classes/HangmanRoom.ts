import { CharGuessResult, Room, User } from "../types";

export class HangmanRoom implements Room {
  public id: string;
  public createdBy: User;
  public users: User[] = [];
  public charsGuessed: string[] = [];
  public createdAt: Date;
  public numErrors: number = 0;

  private phrase: string;
  private phraseNormalized: string;

  constructor(phrase: string) {
    this.phrase = phrase;
    this.createdAt = new Date();

    this.phraseNormalized = phrase
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  public guessChar = (char: string): CharGuessResult => {
    if (this.charsGuessed.includes(char)) {
      throw new Error(`Char ${char} has already been guessed.`);
    }

    this.charsGuessed.push(char);

    const isGuessCorrect = new RegExp(char, "i").test(this.phrase);

    if (!isGuessCorrect) ++this.numErrors;

    return {
      char,
      isCorrect: isGuessCorrect,
    };
  };

  public getMaskedPhrase = (): string => {
    const regExp = new RegExp(`(?![${this.charsGuessed.join("")}])[a-z]`, "gi");

    return this.phraseNormalized.replace(regExp, "_");
  };
}
