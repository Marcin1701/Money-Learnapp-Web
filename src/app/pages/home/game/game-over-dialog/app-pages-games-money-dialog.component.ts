import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppPagesAnswerFormComponent } from '../../../answer/form/app-pages-answer-form.component';


@Component({
  selector: 'mr-app-pages-games-money-game-over-dialog-component',
  templateUrl: 'app-pages-games-money-dialog.component.html',
  styleUrls: [ 'app-pages-games-money-dialog.component.scss' ]
})
export class AppPagesGamesMoneyDialogComponent {

  constructor(public dialogRef: MatDialogRef<AppPagesAnswerFormComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string) {
  }

  oneMoreTime() {
    window.location.reload();
  }
}
