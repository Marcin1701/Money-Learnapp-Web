import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppCreatorSingleChoiceComponent, SingleChoiceContent} from '../app-creator-single-choice.component';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'mr-app-creator-single-choice-dialog',
  templateUrl: 'app-creator-single-choice-dialog.component.html',
  styleUrls: ['app-creator-single-choice-dialog.component.scss']
})
export class AppCreatorSingleChoiceDialogComponent {

  singleChoiceFormGroup: FormGroup;
  correctSingleChoiceOptionIndex: number;

  get singleChoiceValues(): FormArray {
    return this.singleChoiceFormGroup.get('singleChoiceValues') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AppCreatorSingleChoiceComponent>,
              @Inject(MAT_DIALOG_DATA) public singleChoiceContent: SingleChoiceContent) {
    this.singleChoiceFormGroup = this.formBuilder.group({
      correctAnswerIndex: -1,
      singleChoiceValues: this.formBuilder.array([], Validators.required),
    });
  }

  newSingleChoice(): FormGroup {
    return this.formBuilder.group({
      value: ''
    });
  }

  addSingleChoice() {
    this.singleChoiceValues.push(this.newSingleChoice());
  }

  onValueChange() {
    this.singleChoiceContent.correctSingleChoiceOptionIndex = this.correctSingleChoiceOptionIndex;
    this.singleChoiceContent.singleChoiceOptions = this.singleChoiceValues.value;
  }

  onSubmit() {
    console.log("Form group", this.singleChoiceFormGroup);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

