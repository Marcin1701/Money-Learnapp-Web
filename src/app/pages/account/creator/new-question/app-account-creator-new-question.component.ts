import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { Question } from '../../../../spec/defs';
import { MoneySandboxService } from '../../../../services/money-sandbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mr-account-creator-new-question-component',
  templateUrl: 'app-account-creator-new-question.component.html',
  styleUrls: [ 'app-account-creator-new-question.component.scss' ],
})
export class AppAccountCreatorNewQuestionComponent {
  items = [
    { value: 'Jednokrotny Wybór', disabled: false },
    { value: 'Wielokrotny Wybór', disabled: false },
    { value: 'Lista Uporządkowana', disabled: false },
    { value: 'Przeciąganie Elementów', disabled: false },
  ];

  question: Question;
  questionType = [ 'SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'LIST', 'DRAG_AND_DROP' ];
  selectedOption = [ { value: '', disabled: false } ];

  constructor(private httpService: MoneySandboxService, private _snackBar: MatSnackBar) {
  }

  drop(event: CdkDragDrop<{disabled: boolean; value: string}[], any>) {
    this.disableItems();
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      moveItemInArray(
        event.container.data,
        event.currentIndex,
        event.previousIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  disableItems() {
    if (this.selectedOption.length === 2) {
      this.items.forEach((item) => (item.disabled = true));
    } else {
      this.items.forEach((item) => (item.disabled = false));
    }
    if (
      this.selectedOption.length < 2 &&
      !this.selectedOption.some((item) => item.value.length > 0)
    ) {
      this.items.forEach((item) => (item.disabled = false));
    }
  }


  prepareQuestion(questionContent: any) {
    let question!: Question;
    switch (this.selectedOption[0].value) {
      case 'Jednokrotny Wybór':
        question = this.createQuestion(this.questionType[0], questionContent);
        break;
      case 'Wielokrotny Wybór':
        question = this.createQuestion(this.questionType[1], questionContent);
        break;
      case 'Lista Uporządkowana':
        question = this.createQuestion(this.questionType[3], questionContent);
        break;
      case 'Przeciąganie Elementów':
        question = this.createQuestion(this.questionType[4], questionContent);
        break;
    }
    this.httpService.addQuestion(question).subscribe(
      (res) => {
        if (res.status < 204) {
          this._snackBar.open('Dodano pytanie', 'Ok', { duration: 1000 });
        }
      },
      (error) => {
        if (error.status === 500) {
          this._snackBar.open('Wystąpił błąd serwera', 'Ok', { duration: 1000 });
        } else {
          this._snackBar.open('Wystąpił nieoczekiwany błąd', 'Ok', { duration: 1000 });
        }
      }
    );
  }

  private createQuestion(type: string, value: any): Question {
    return {
      type: type,
      structure: value,
    };
  }
}
