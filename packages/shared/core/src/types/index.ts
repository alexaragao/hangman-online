export interface User {
  id: string;
  nickname: string;
}

export interface Room {
  id: string;
  createdBy: User;
  users: User[];
  charsGuessed: string[];
  numErrors: number;
  createdAt: Date;
}

export interface CharGuessResult {
  char: string;
  isCorrect: boolean;
}
