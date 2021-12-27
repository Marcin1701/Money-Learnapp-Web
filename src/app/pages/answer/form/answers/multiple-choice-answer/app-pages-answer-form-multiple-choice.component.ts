import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MultipleChoiceQuestionResponse } from '../../../../../spec/defs';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'mr-app-pages-answer-form-multiple-choice',
  templateUrl: 'app-pages-answer-form-multiple-choice.component.html',
  styleUrls: [ './app-pages-answer-form-multiple-choice.component.scss' ],
})
export class AppPagesAnswerFormMultipleChoiceComponent implements OnInit {
  @Input()
  multipleChoice: MultipleChoiceQuestionResponse;

  @Output()
  multipleChoiceChanged = new EventEmitter<{id: string, value: number[]}>();

  ngOnInit(): void {
    this.multipleChoice.question.correctMultipleChoiceOptionIndices = [];
  }

  checkMultipleChoice($event: MatCheckboxChange) {
    this.multipleChoiceChanged.emit({
      id: this.multipleChoice.id,
      value: this.calculateMultipleChoice($event),
    });
  }

  private calculateMultipleChoice($event: MatCheckboxChange): number[] {
    // tslint:disable-next-line:radix
    const value = this.multipleChoice.question.multipleChoiceOptions.indexOf($event.source.value);
    if ($event.checked) {
      this.multipleChoice.question.correctMultipleChoiceOptionIndices.push(value);
    } else if (!$event.checked) {
      this.multipleChoice.question.correctMultipleChoiceOptionIndices =
        this.multipleChoice.question.correctMultipleChoiceOptionIndices.filter(option => option !== value);
    }
    return this.multipleChoice.question.correctMultipleChoiceOptionIndices;
  }
}
