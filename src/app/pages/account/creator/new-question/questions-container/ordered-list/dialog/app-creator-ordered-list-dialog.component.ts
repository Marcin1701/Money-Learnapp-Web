import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppCreatorSingleChoiceComponent } from '../../single-choice/app-creator-single-choice.component';
import { OrderedListContent } from '../../../../../../../spec/question-defs';

@Component({
  selector: 'mr-app-creator-ordered-list-dialog',
  templateUrl: 'app-creator-ordered-list-dialog.component.html',
  styleUrls: [ 'app-creator-ordered-list-dialog.component.scss' ],
})
export class AppCreatorOrderedListDialogComponent {
  orderedListFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppCreatorSingleChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public orderedListContent: OrderedListContent
  ) {
    this.orderedListFormGroup = this.formBuilder.group({
      orderedListValues: this.formBuilder.array([], Validators.required),
    });
    if (!this.orderedListContent.orderedListOptions.length) {
      this.addOrderedList();
    }
    if (this.orderedListContent) {
      this.orderedListContent.orderedListOptions.forEach(option => this.addOrderedList(option));
    }
  }

  get orderedListValues(): FormArray {
    return this.orderedListFormGroup.get('orderedListValues') as FormArray;
  }

  newOrderedList(parameterValue?: string): FormGroup {
    return this.formBuilder.group({ value: parameterValue ? parameterValue : '' });
  }

  addOrderedList(parameterValue?: string) {
    this.orderedListValues.push(this.newOrderedList(parameterValue));
  }

  removeOrderedList(i: number) {
    this.orderedListValues.removeAt(i);
  }

  onSubmit() {
    this.orderedListContent.orderedListOptions =
      this.orderedListValues.value.map((item: {value: any; }) => item.value);
    this.dialogRef.close(this.orderedListContent);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
