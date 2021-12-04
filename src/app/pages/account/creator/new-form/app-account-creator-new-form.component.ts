import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FormRequest} from '../../../../spec/defs';
import {MoneySandboxService} from '../../../../services/money-sandbox.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'mr-account-creator-new-form-component',
  templateUrl: 'app-account-creator-new-form.component.html',
  styleUrls: ['app-account-creator-new-form.component.scss'],
})
export class AppAccountCreatorNewFormComponent {
  newFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    answerTime: ['', Validators.required],
    difficulty: ['', Validators.required],
  });
  questionIds: string[] = [];

  constructor(private formBuilder: FormBuilder, private httpService: MoneySandboxService, private _snackBar: MatSnackBar) {
  }

  onSubmit() {
    this.httpService.addForm(this.mapFormGroupToFormRequest()).subscribe(response => {
      if (response.status < 204) {
        this._snackBar.open('Pomyślnie dodano nowy arkusz', 'Ok', { duration: 1000 });
      }
    }, () => {
      this._snackBar.open('Nie udało się dodać arkusza', 'Ok', { duration: 1000 });
    });
  }

  addQuestion(questionId: string) {
    if (this.questionIds.some(id => id === questionId)) {
      this.questionIds.splice(this.questionIds.indexOf(questionId, 0), 1);
    } else {
      this.questionIds.push(questionId);
    }
  }

  selectMultipleChoice(questionId: string) {

  }

  private mapFormGroupToFormRequest(): FormRequest {
    return {
      name: this.newFormGroup.controls['name'].value,
      difficulty: this.newFormGroup.controls['difficulty'].value,
      answerTime: this.newFormGroup.controls['answerTime'].value,
      questionIds: this.questionIds
    };
  }
}
