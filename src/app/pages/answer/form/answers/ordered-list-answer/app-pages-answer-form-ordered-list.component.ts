import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderedListQuestionResponse } from '../../../../../spec/defs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


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

  ngOnInit(): void {
    this.orderedListValues = this.orderedList.question.orderedListOptions;
    this.shuffleOrderList();
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

  private shuffleOrderList() {
    let currentIndex = this.orderedListValues.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.orderedListValues[currentIndex], this.orderedListValues[randomIndex]] =
      [this.orderedListValues[randomIndex], this.orderedListValues[currentIndex]];
    }
  }
}
