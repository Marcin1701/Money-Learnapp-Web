import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DragAndDropQuestionResponse } from '../../../../../spec/defs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'mr-app-pages-answer-form-drag-and-drop',
  templateUrl: 'app-pages-answer-form-drag-and-drop.component.html',
  styleUrls: [ './app-pages-answer-form-drag-and-drop.component.scss' ],
})
export class AppPagesAnswerFormDragAndDropComponent implements OnInit {
  @Input()
  dragAndDrop: DragAndDropQuestionResponse;

  @Output()
  dragAndDropChanged = new EventEmitter<{id: string, value: number}>();

  items: {optionName: string, optionCost: number}[] = [];
  shoppingCart: {optionName: string, optionCost: number}[] = [];
  currentBalance = 0;

  ngOnInit(): void {
    this.dragAndDrop.question.optionName.forEach((name, index) => {
      this.items.push({ optionName: name, optionCost: this.dragAndDrop.question.optionCost[index] });
    });
  }

  drop(event: CdkDragDrop<{optionName: string; optionCost: number}[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.id === 'cdk-drop-list-0') {
        this.currentBalance += event.item.data.optionCost;
      } else if (event.previousContainer.id === 'cdk-drop-list-1') {
        this.currentBalance -= event.item.data.optionCost;
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.dragAndDropChanged.emit({id: this.dragAndDrop.id, value: this.currentBalance});
    }
  }
}
