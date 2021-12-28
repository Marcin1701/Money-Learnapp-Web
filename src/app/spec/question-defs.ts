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

export interface MultipleChoice {
  question: string;
  name: string;
  answerTime: string;
  value: MultipleChoiceContent;
}

export interface OrderedListContent {
  orderedListOptions: string[];
}

export interface OrderedList {
  question: string;
  name: string;
  answerTime: string;
  value: OrderedListContent;
}

export interface DragAndDropContent {
  allDragAndDropOptions: {
    optionName: string;
    optionCost: number;
  }[];
  balance: number | null;
}

export interface DragAndDrop {
  question: string;
  name: string;
  answerTime: string;
  value: DragAndDropContent;
}
