import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MultipleChoiceContent } from '../../../../../../../spec/question-defs';
import { AppCreatorMultipleChoiceComponent } from '../app-creator-multiple-choice.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'mr-app-creator-multiple-choice-game-over-dialog',
  templateUrl: 'app-creator-multiple-choice-dialog.component.html',
  styleUrls: [ 'app-creator-multiple-choice-dialog.component.scss' ],
})
export class AppCreatorMultipleChoiceDialogComponent {
  multipleChoiceFormGroup: FormGroup;
  correctMultipleChoiceOptions: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppCreatorMultipleChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public multipleChoiceContent: MultipleChoiceContent
  ) {

    this.multipleChoiceFormGroup = this.formBuilder.group({
      correctMultipleChoiceOptionIndices: this.formBuilder.array([], Validators.required),
      multipleChoiceValues: this.formBuilder.array([], Validators.required),
    });
    if (!this.multipleChoiceContent.multipleChoiceOptions.length) {
      this.addMultipleChoice();
    }
    if (this.multipleChoiceContent) {
      this.correctMultipleChoiceOptions = this.multipleChoiceContent.correctMultipleChoiceOptionIndices;
      this.multipleChoiceContent.multipleChoiceOptions.forEach(option => this.addMultipleChoice(option));
    }
  }

  get multipleChoiceValues(): FormArray {
    return this.multipleChoiceFormGroup.get('multipleChoiceValues') as FormArray;
  }

  newMultipleChoice(parameterValue?: string): FormGroup {
    return this.formBuilder.group({ value: parameterValue ? parameterValue : '' });
  }

  addMultipleChoice(parameterValue?: string) {
    this.multipleChoiceValues.push(this.newMultipleChoice(parameterValue));
  }

  removeMultipleChoice(i: number) {
    this.correctMultipleChoiceOptions = this.correctMultipleChoiceOptions.filter(option => option !== i);
    this.correctMultipleChoiceOptions = this.correctMultipleChoiceOptions.map((option, index) => {
      if (index >= i) {
        return option - 1;
      }
      return option;
    });
    this.multipleChoiceValues.removeAt(i);
  }

  onSubmit() {
    this.multipleChoiceContent.correctMultipleChoiceOptionIndices =
      this.correctMultipleChoiceOptions;
    this.multipleChoiceContent.multipleChoiceOptions =
      this.multipleChoiceValues.value.map((item: {value: any; }) => item.value);
    this.dialogRef.close(this.multipleChoiceContent);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeCorrectValue($event: MatCheckboxChange) {
    // tslint:disable-next-line:radix
    const value = parseInt($event.source.value);
    if ($event.checked) {
      this.correctMultipleChoiceOptions.push(value);
    } else {
      this.correctMultipleChoiceOptions = this.correctMultipleChoiceOptions.filter(option => option !== value);
    }
  }

  shouldBeChecked(i: number) {
    return this.correctMultipleChoiceOptions.some(option => option === i);
  }
}
