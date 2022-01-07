import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'mr-app-common-question-delete-confirmation-dialog',
  templateUrl: 'app-common-question-delete-confirmation-dialog.component.html',
  styleUrls: [ 'app-common-question-delete-confirmation-dialog.component.scss' ]
})
export class AppCommonQuestionDeleteConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AppCommonQuestionDeleteConfirmationDialogComponent>,
  ) {
  }

  onNoClick() {
    this.dialogRef.close('NO');
  }

  onConfirm() {
    this.dialogRef.close('DELETE');
  }
}
