import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SingleChoiceQuestionResponse} from '../../../../../spec/defs';
import {MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'mr-app-pages-answer-form-single-choice',
  templateUrl: 'app-pages-answer-form-single-choice.component.html',
  styleUrls: ['./app-pages-answer-form-single-choice.component.scss'],
})
export class AppPagesAnswerFormSingleChoiceComponent {
  @Input()
  singleChoice: SingleChoiceQuestionResponse;

  @Output()
  singleChoiceChanged = new EventEmitter<{ id: string, value: number }>();

  checkSingleChoice($event: MatRadioChange) {
    this.singleChoiceChanged.emit({
      id: this.singleChoice.id,
      value: this.singleChoice.question.singleChoiceOptions.indexOf($event.value),
    });
  }
}
