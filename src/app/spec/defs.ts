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
}

export interface AccountResponse {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  creationDate: string;
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
  id: string;
  creationDate: string;
  question: {
    answerTime: string;
    correctSingleChoiceIndex: number;
    name: string;
    question: string;
    singleChoiceOptions: string[];
  };
}

export interface MultipleChoiceQuestionResponse {
  id: string;
}

export interface DragAndDropQuestionResponse {
  id: string;
}

export interface OrderedListQuestionResponse {
  id: string;
}

export interface FormResponse {
  questions: number;
  name: string;
  answerTime: number;
  creationDate: string;
  answers: number;
  isPublic: boolean;
}

export interface FormRequest {
  questionIds: string[];
  name: string;
  difficulty: number;
  answerTime: number;
}
