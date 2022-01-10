import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountResponse } from '../../../spec/defs';
import { FormBuilder, Validators } from '@angular/forms';
import { MoneySandboxService } from '../../../services/money-sandbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'mr-app-account-settings-dialog',
  templateUrl: 'app-account-settings-dialog.component.html',
  styleUrls: [ 'app-account-settings-dialog.component.scss' ],
})
export class AppAccountSettingsDialogComponent {

  pending = false;

  accountFormGroup = this.formBuilder.group({
    login: [ '', Validators.required ],
    firstName: [ '', Validators.required ],
    lastName: [ '', Validators.required ],
    email: [ '', Validators.required ],
  });

  constructor(
    public dialogRef: MatDialogRef<AppAccountSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public account: AccountResponse,
    private formBuilder: FormBuilder,
    private httpService: MoneySandboxService,
    private _matSnackBar: MatSnackBar,
  ) {
    this.accountFormGroup = this.formBuilder.group({
      login: account.login,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email
    });
  }

  apply() {
    this.pending = true;
    const modifiedAccount = {
      login: this.accountFormGroup.controls['login'].value,
      firstName: this.accountFormGroup.controls['firstName'].value,
      lastName: this.accountFormGroup.controls['lastName'].value,
      email: this.accountFormGroup.controls['email'].value,
    } as AccountResponse;
    this.httpService.updateAccount(modifiedAccount).subscribe(response => {
      this.pending = false;
      if (response.status < 205) {
        this._matSnackBar.open('Pomyślnie zmodyfikowano dane', 'Ok', { duration: 1000 });
        this.dialogRef.close();
      }
    }, (error) => {
      this.pending = false;
      if (error.status === 400) {
        this._matSnackBar.open('Użytkownik z takimi danymi istnieje', 'Ok', { duration: 3000 });
      } else {
        this._matSnackBar.open('Wystąpił nieoczekiwany błąd', 'Ok', { duration: 3000 });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
