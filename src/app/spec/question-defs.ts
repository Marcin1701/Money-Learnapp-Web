export interface SingleChoiceContent {
  singleChoiceOptions: string[];
  correctSingleChoiceOptionIndex: number;
}

export interface SingleChoice {
  question: string;
  name: string;
  answerTime: string;
  value: SingleChoiceContent;
}

export interface MultipleChoiceContent {
  multipleChoiceOptions: string[];
  correctMultipleChoiceOptionIndices: number[];
}

export interface MultipleChoice extends MultipleChoiceContent {
  question: string;
  name: string;
}