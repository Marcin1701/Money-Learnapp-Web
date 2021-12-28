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

export interface AccountRole {
  role: string;
}

export interface AccountResponse {
  id: string;
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
  creationDate: string;
  question: {
    answerTime: string;
    correctMultipleChoiceOptionIndices: number[];
    name: string;
    question: string;
    multipleChoiceOptions: string[];
  };
}

export interface DragAndDropQuestionResponse {
  id: string;
  creationDate: string;
  question: {
    answerTime: string;
    name: string;
    question: string;
    balance: number;
    optionName: string[];
    optionCost: number[];
  };
}

export interface OrderedListQuestionResponse {
  id: string;
  creationDate: string;
  question: {
    answerTime: string;
    name: string;
    question: string;
    orderedListOptions: string[];
  };
}

export interface FormToAnswerResponse {
  id: string;
  name: string;
  questions: any[];
  difficulty: number;
  creationDate: string;
}

export interface FormResponse {
  id: string;
  questions: number;
  name: string;
  answerTime: number;
  creationDate: string;
  difficulty: number;
  answers: number;
  isPublic: boolean;
}

export interface FormRequest {
  questionIds: string[];
  name: string;
  difficulty: number;
  answerTime: number;
}

export interface AnswersRequest {
  formId: string;
  answerer?: string;
  userId?: string;
  answers: {
    questionType: string;
    answer: any;
  }[];
}

export interface SingleChoiceAnswer {
  questionId: string;
  optionChosen: number;
}

export interface MultipleChoiceAnswer {
  questionId: string;
  optionChosen: number[];
}

export interface SingleChoiceAnswer {
  chosenOption: number;
}

export interface SingleChoiceAnswer {
  chosenOption: number;
}

export interface ResultsResponse {
  percentage: string;
  allQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export interface HomeFormResponse {
  id: string;
  firstName: string;
  lastName: string;
  login?: string;
  email?: string;
  questions: number;
  name: string;
  answerTime: number;
  creationDate: string;
  difficulty: number;
  answers: number;
  isPublic: boolean;
}

export interface AnswersSummary {
  allAnswers: number;
  allAnswersPercentage: string;
  allQuestions: number;
  allCorrectQuestions: number;
  allWrongQuestions: number;
}

export interface FormPublicityResponse {
  pendingPublicity: boolean;
  requestedVerificationDate: string;
}
