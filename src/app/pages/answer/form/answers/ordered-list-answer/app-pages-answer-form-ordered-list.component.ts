import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderedListQuestionResponse } from '../../../../../spec/defs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ShuffleArrayService } from '../../../../../services/shuffle-array.service';


@Component({
  selector: 'mr-app-pages-answer-form-ordered-list',
  templateUrl: 'app-pages-answer-form-ordered-list.component.html',
  styleUrls: [ './app-pages-answer-form-ordered-list.component.scss' ],
})
export class AppPagesAnswerFormOrderedListComponent implements OnInit {
  @Input()
  orderedList: OrderedListQuestionResponse;

  @Output()
  orderedListChanged = new EventEmitter<{id: string, value: string[]}>();

  orderedListValues: string[];

  constructor(private shuffleArray: ShuffleArrayService) {
  }

  ngOnInit(): void {
    this.orderedListValues = this.orderedList.question.orderedListOptions;
    this.orderedListValues = this.shuffleArray.shuffleArray(this.orderedListValues);
    this.checkOrderedList();
  }

  checkOrderedList() {
    this.orderedListChanged.emit({
      id: this.orderedList.id,
      value: this.orderedListValues,
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.orderedListValues, event.previousIndex, event.currentIndex);
    this.checkOrderedList();
  }
}
