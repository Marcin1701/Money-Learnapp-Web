import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'mr-account-creator-new-question-component',
  templateUrl: 'app-account-creator-new-question.component.html',
  styleUrls: ['app-account-creator-new-question.component.scss']
})
export class AppAccountCreatorNewQuestionComponent {
  items = [
    { value: 'Jednokrotny Wybór', disabled: false },
    { value: 'Wielokrotny Wybór', disabled: false },
    { value: 'Lista Uporządkowana', disabled: false },
    { value: 'Przeciąganie Elementów', disabled: false }
  ];

  selectedOption = [{ value: '', disabled: false }];

  drop(event: CdkDragDrop<{ disabled: boolean; value: string }[], any>) {
    this.disableItems();
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(event.container.data, event.currentIndex, event.previousIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  disableItems() {
    if (this.selectedOption.length === 2) {
      this.items.forEach(item => item.disabled = true);
    } else {
      this.items.forEach(item => item.disabled = false);
    }
    if (this.selectedOption.length < 2 && !this.selectedOption.some(item => item.value.length > 0)) {
      this.items.forEach(item => item.disabled = false);
    }
  }
}
