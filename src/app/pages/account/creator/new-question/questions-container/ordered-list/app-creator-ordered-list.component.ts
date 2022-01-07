import { Component, EventEmitter, Output } from '@angular/core';
import { OrderedList, OrderedListContent } from '../../../../../../spec/question-defs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppCreatorOrderedListDialogComponent } from './dialog/app-creator-ordered-list-dialog.component';

@Component({
  selector: 'mr-app-creator-ordered-list',
  templateUrl: 'app-creator-ordered-list.component.html',
  styleUrls: [ 'app-creator-ordered-list.component.scss' ],
})
export class AppCreatorOrderedListComponent {
  orderedList: OrderedList;

  orderedListContent: OrderedListContent = {
    orderedListOptions: [],
  };

  orderedListFormGroup = this.formBuilder.group({
    name: [ '', Validators.required ],
    question: [ '', Validators.required ],
  });

  @Output()
  addQuestion: EventEmitter<OrderedList> = new EventEmitter<OrderedList>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppCreatorOrderedListDialogComponent, {
      width: '800px',
      height: '600px',
      data: this.orderedListContent,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open('Zmodyfikowano pytanie', 'Ok', {duration: 1000});
      }
      this.orderedListContent = result;
      dialogRef.close();
    });
  }

  prepareQuestion() {
    this.orderedList = {
      name: this.orderedListFormGroup.controls['name'].value,
      question: this.orderedListFormGroup.controls['question'].value,
      value: this.orderedListContent,
    };
  }
}
