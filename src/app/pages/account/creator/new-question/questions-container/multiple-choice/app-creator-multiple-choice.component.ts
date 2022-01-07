import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppCreatorMultipleChoiceDialogComponent } from './dialog/app-creator-multiple-choice-dialog.component';
import { MultipleChoice, MultipleChoiceContent } from '../../../../../../spec/question-defs';

@Component({
  selector: 'mr-app-creator-multiple-choice',
  templateUrl: 'app-creator-multiple-choice.component.html',
  styleUrls: [ 'app-creator-multiple-choice.component.scss' ],
})
export class AppCreatorMultipleChoiceComponent {
  multipleChoice: MultipleChoice;

  multipleChoiceContent: MultipleChoiceContent = {
    multipleChoiceOptions: [],
    correctMultipleChoiceOptionIndices: [],
  };
  multipleChoiceFormGroup = this.formBuilder.group({
    name: [ '', Validators.required ],
    question: [ '', Validators.required ],
  });

  @Output()
  addQuestion: EventEmitter<MultipleChoice> = new EventEmitter<MultipleChoice>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppCreatorMultipleChoiceDialogComponent, {
      width: '800px',
      height: '600px',
      data: this.multipleChoiceContent,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open('Zmodyfikowano pytanie', 'Ok');
      }
      this.multipleChoiceContent = result;
      dialogRef.close();
    });
  }

  prepareQuestion() {
    this.multipleChoice = {
      name: this.multipleChoiceFormGroup.controls['name'].value,
      question: this.multipleChoiceFormGroup.controls['question'].value,
      value: this.multipleChoiceContent,
    };
  }
}
