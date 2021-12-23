import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormResponse } from '../../../../spec/defs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoneySandboxService } from '../../../../services/money-sandbox.service';
import { AppPagesAdminPublicityComponent } from '../app-pages-admin-publicity.component';

@Component({
  selector: 'mr-app-pages-admin-publicity-publish',
  templateUrl: 'app-pages-admin-publicity-publish.component.html',
  styleUrls: [ './app-pages-admin-publicity-publish.component.scss' ],
})
export class AppPagesAdminPublicityPublishComponent {

  pending = false;

  constructor(public dialogRef: MatDialogRef<AppPagesAdminPublicityComponent>,
              @Inject(MAT_DIALOG_DATA) public form: FormResponse,
              private _matSnackBar: MatSnackBar,
              private httpService: MoneySandboxService) {
  }

  publish() {
    this.pending = true;
    this.httpService.publishForm(this.form.id).subscribe(response => {
      this._matSnackBar.open('Pomyślnie opublikowano arkusz', 'Ok', { duration: 1000 });
      this.pending = false;
      this.dialogRef.close(true);
    }, () => {
      this.pending = false;
      this._matSnackBar.open('Nie udało się opublikować arkusza', 'Ok', { duration: 3000 });
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
