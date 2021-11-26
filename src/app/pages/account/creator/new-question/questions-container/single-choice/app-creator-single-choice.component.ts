import {Component, EventEmitter, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppCreatorSingleChoiceDialogComponent } from './dialog/app-creator-single-choice-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SingleChoice, SingleChoiceContent} from '../../../../../../spec/question-defs';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'mr-app-creator-single-choice',
  templateUrl: 'app-creator-single-choice.component.html',
  styleUrls: ['app-creator-single-choice.component.scss'],
})
export class AppCreatorSingleChoiceComponent {
  singleChoice: SingleChoice;

  singleChoiceContent: SingleChoiceContent = {
    singleChoiceOptions: [],
    correctSingleChoiceOptionIndex: -1,
  };

  singleChoiceFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    question: ['', Validators.required],
    answerTime: ['', Validators.required]
  });

  @Output()
  addQuestion: EventEmitter<SingleChoice> = new EventEmitter<SingleChoice>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private formBuilder: FormBuilder) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AppCreatorSingleChoiceDialogComponent, {
      width: '800px',
      height: '600px',
      data: this.singleChoiceContent,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.openSnackBar('Zmodyfikowano pytanie', 'Ok');
      }
      this.singleChoiceContent = result;
      dialogRef.close();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  prepareQuestion() {
    this.singleChoice = {
      name: this.singleChoiceFormGroup.controls['name'].value,
      question: this.singleChoiceFormGroup.controls['question'].value,
      answerTime: this.singleChoiceFormGroup.controls['answerTime'].value.toString(),
      value: this.singleChoiceContent,
    };
  }
}
