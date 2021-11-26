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

export interface JsonWebTokenResponse {
  jsonWebToken: string;
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
