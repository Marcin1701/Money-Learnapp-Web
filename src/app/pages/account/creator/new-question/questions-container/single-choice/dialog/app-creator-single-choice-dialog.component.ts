import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppCreatorSingleChoiceComponent, SingleChoiceContent} from '../app-creator-single-choice.component';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';


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
    this.addSingleChoice();
  }

  newSingleChoice(): FormGroup {
    return this.formBuilder.group({ value: '',
    }, Validators.required);
  }

  addSingleChoice() {
    this.singleChoiceValues.push(this.newSingleChoice());
  }

  removeSingleChoice(i: number) {
    this.singleChoiceValues.removeAt(i);
  }

  onValueChange() {
    this.singleChoiceContent.correctSingleChoiceOptionIndex = this.correctSingleChoiceOptionIndex;
    this.singleChoiceContent.singleChoiceOptions = this.singleChoiceValues.value;
  }

  onSubmit() {
    this.singleChoiceContent.correctSingleChoiceOptionIndex = this.correctSingleChoiceOptionIndex;
    this.singleChoiceContent.singleChoiceOptions = this.singleChoiceValues.value;
    console.log("Form group", this.singleChoiceContent);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeCorrectValue($event: MatRadioChange) {
    this.correctSingleChoiceOptionIndex = $event.value;
  }
}

