import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DragAndDrop, DragAndDropContent } from 'src/app/spec/question-defs';
import { AppCreatorDragAndDropDialogComponent } from './dialog/app-creator-drag-and-drop-dialog.component';

@Component({
  selector: 'mr-app-creator-drag-and-drop',
  templateUrl: 'app-creator-drag-and-drop.component.html',
  styleUrls: [ 'app-creator-drag-and-drop.component.scss' ],
})
export class AppCreatorDragAndDropComponent {
  dragAndDrop: DragAndDrop;

  dragAndDropContent: DragAndDropContent = {
    allDragAndDropOptions: Array.of({optionName: '', optionCost: 0}),
    balance: null
  };

  dragAndDropFormGroup = this.formBuilder.group({
    name: [ '', Validators.required ],
    question: [ '', Validators.required ],
  });

  @Output()
  addQuestion: EventEmitter<DragAndDrop> = new EventEmitter<DragAndDrop>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppCreatorDragAndDropDialogComponent, {
      width: '800px',
      height: '600px',
      data: this.dragAndDropContent,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open('Zmodyfikowano pytanie', 'Ok', {duration: 1000});
      }
      this.dragAndDropContent = result;
      dialogRef.close();
    });
  }

  prepareQuestion() {
    this.dragAndDrop = {
      name: this.dragAndDropFormGroup.controls['name'].value,
      question: this.dragAndDropFormGroup.controls['question'].value,
      value: this.dragAndDropContent,
    };
  }
}

