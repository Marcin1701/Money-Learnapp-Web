import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppCreatorSingleChoiceComponent, } from '../app-creator-single-choice.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { SingleChoiceContent } from '../../../../../../../spec/question-defs';

@Component({
  selector: 'mr-app-creator-single-choice-game-over-dialog',
  templateUrl: 'app-creator-single-choice-dialog.component.html',
  styleUrls: [ 'app-creator-single-choice-dialog.component.scss' ],
})
export class AppCreatorSingleChoiceDialogComponent {
  singleChoiceFormGroup: FormGroup;
  correctSingleChoiceOptionIndex = 0;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppCreatorSingleChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public singleChoiceContent: SingleChoiceContent
  ) {
    this.singleChoiceFormGroup = this.formBuilder.group({
      correctAnswerIndex: -1,
      singleChoiceValues: this.formBuilder.array([], Validators.required),
    });
    if (!this.singleChoiceContent.singleChoiceOptions.length) {
      this.addSingleChoice();
    }
    if (this.singleChoiceContent) {
      this.correctSingleChoiceOptionIndex = this.singleChoiceContent.correctSingleChoiceOptionIndex;
      this.singleChoiceContent.singleChoiceOptions.forEach(option => this.addSingleChoice(option));
    }
  }

  get singleChoiceValues(): FormArray {
    return this.singleChoiceFormGroup.get('singleChoiceValues') as FormArray;
  }

  newSingleChoice(parameterValue?: string): FormGroup {
    return this.formBuilder.group({ value: parameterValue ? parameterValue : '' });
  }

  addSingleChoice(parameterValue?: string) {
    this.singleChoiceValues.push(this.newSingleChoice(parameterValue));
  }

  removeSingleChoice(i: number) {
    this.singleChoiceValues.removeAt(i);
  }

  onSubmit() {
    this.singleChoiceContent.correctSingleChoiceOptionIndex =
      this.correctSingleChoiceOptionIndex;
    this.singleChoiceContent.singleChoiceOptions =
      this.singleChoiceValues.value.map((item: {value: any;}) => item.value);
    this.dialogRef.close(this.singleChoiceContent);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeCorrectValue($event: MatRadioChange) {
    this.correctSingleChoiceOptionIndex = $event.value;
  }
}
