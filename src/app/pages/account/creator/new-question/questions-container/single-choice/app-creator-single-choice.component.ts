import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AppCreatorSingleChoiceDialogComponent} from './dialog/app-creator-single-choice-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'mr-app-creator-single-choice',
  templateUrl: 'app-creator-single-choice.component.html',
  styleUrls: ['app-creator-single-choice.component.scss']
})
export class AppCreatorSingleChoiceComponent {

  singleChoiceContent: SingleChoiceContent;

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AppCreatorSingleChoiceDialogComponent, {
      width: '400px',
      data: this.singleChoiceContent,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Resulst", result);
      if (result) {
        this.openSnackBar('Zmodyfikowano pytanie', 'Ok');
      }
      this.singleChoiceContent = result;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

export interface SingleChoiceContent {
  singleChoiceOptions: string[];
  correctSingleChoiceOptionIndex: number;
}

export interface SingleChoice extends SingleChoiceContent {
  question: string;
}
