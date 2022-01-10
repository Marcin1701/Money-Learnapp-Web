import { Component, DoCheck, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DragAndDropContent } from 'src/app/spec/question-defs';
import { AppCreatorDragAndDropComponent } from '../app-creator-drag-and-drop.component';

@Component({
  selector: 'mr-app-creator-drag-and-drop-game-over-dialog',
  templateUrl: 'app-creator-drag-and-drop-dialog.component.html',
  styleUrls: [ 'app-creator-drag-and-drop-dialog.component.scss' ],
})
export class AppCreatorDragAndDropDialogComponent implements DoCheck {
  dragAndDropFormGroup: FormGroup;

  currentBalance = 0;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppCreatorDragAndDropComponent>,
    @Inject(MAT_DIALOG_DATA) public dragAndDropContent: DragAndDropContent
  ) {
    this.dragAndDropFormGroup = this.formBuilder.group({
      balance: dragAndDropContent.balance ? dragAndDropContent.balance : null,
      dragAndDropValues: this.formBuilder.array([], Validators.required),
    });
    if (!this.dragAndDropContent.allDragAndDropOptions.length) {
      this.addDragAndDrop();
    }
    if (this.dragAndDropContent) {
      this.dragAndDropContent.allDragAndDropOptions.forEach((option) =>
        this.addDragAndDrop(option.optionName, option.optionCost)
      );
    }
  }

  ngDoCheck(): void {
    let money = 0;
    this.dragAndDropValues.value.forEach((value: { optionName: string, optionCost: number; }) => money = money + value.optionCost);
    this.currentBalance = money;
  }

  get dragAndDropValues(): FormArray {
    return this.dragAndDropFormGroup.get('dragAndDropValues') as FormArray;
  }

  newDragAndDrop(optionName?: string, optionCost?: number): FormGroup {
    return this.formBuilder.group({
        optionName: optionName ? optionName : '',
        optionCost: optionCost ? optionCost : null,
    });
  }

  addDragAndDrop(optionName?: string, optionCost?: number) {
    this.dragAndDropValues.push(this.newDragAndDrop(optionName, optionCost));
  }

  removeDragAndDrop(i: number) {
    this.dragAndDropValues.removeAt(i);
  }

  onSubmit() {
    this.dragAndDropContent.balance = this.dragAndDropFormGroup.controls['balance'].value;
    this.dragAndDropContent.allDragAndDropOptions =
      this.dragAndDropValues.value.map((item: { optionName: string, optionCost: number; }) => {
        return {
          optionName: item.optionName,
          optionCost: item.optionCost
        };
      });
    this.dialogRef.close(this.dragAndDropContent);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isIncorrect(): boolean {
    const values = this.dragAndDropValues.value.map((item: { optionName: string, optionCost: number; }) => {
      return {
        optionName: item.optionName,
        optionCost: item.optionCost
      };
    });
    if (!values[0].optionName.length || !values[0].optionCost) {
      return true;
    }
    const names = values.map((value: { optionCost: number, optionName: string; }) => value.optionName);
    return (new Set(names).size !== names.length);
  }
}
