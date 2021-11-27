export interface LoginRequest {
  login: string;
  password: string;
}

export interface NewAccount {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  accountType: string;
}

export interface AccountResponse {
  login: string;
  firstName: string;
  lastName: string;
  accountType: string;
  email: string;
  creationDate: string;
}

export interface JsonWebTokenResponse {
  jsonWebToken: string;
}

export interface GeneratedPassword {
  generatedPassword: string;
}

export interface Question {
  creationDate?: Date;
  type: string;
  structure: any;
}

export interface SingleChoiceQuestionResponse {
  creationDate: string;
  question: {
    answerTime: string;
    correctSingleChoiceIndex: number;
    name: string;
    question: string;
    singleChoiceOptions: string[];
  };
}

export interface StudentRequest {
  firstName: string;
  lastName: string;
  login: string;
  email?: string;
  className?: string;
  accountType: string;
  isCreatorAllowed: boolean;
  isTemporaryPasswordActive: boolean;
}

export interface StudentResponse {
  firstName: string;
  lastName: string;
  className: string;
  login: string;
  email: string;
  creationDate: string;
  isCreatorAllowed: boolean;
  isTemporaryPasswordActive: boolean;
}
