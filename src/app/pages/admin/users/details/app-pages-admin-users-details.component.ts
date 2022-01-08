import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountDetailsResponse, AccountResponse } from '../../../../spec/defs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoneySandboxService } from '../../../../services/money-sandbox.service';


@Component({
  selector: 'mr-app-pages-admin-users-details',
  templateUrl: 'app-pages-admin-users-details.component.html',
  styleUrls: [ './app-pages-admin-users-details.component.scss' ],
})
export class AppPagesAdminUsersDetailsComponent implements OnInit {

  pending = false;

  accountDetails: AccountDetailsResponse;

  constructor(public dialogRef: MatDialogRef<AppPagesAdminUsersDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public user: AccountResponse,
              private _matSnackBar: MatSnackBar,
              private httpService: MoneySandboxService) {
  }

  ngOnInit() {
    this.refreshData();
  }

  deleteAll() {
    this.httpService.deleteAccount(this.user.id).subscribe(response => {
      if (response.status < 205) {
        this.onSuccessSnackBar();
        this.dialogRef.close('DELETE');
      } else {
        this.onErrorSnackBar();
      }
    }, () => {
      this.onErrorSnackBar();
    });
  }

  deleteForms() {
    this.httpService.deleteAccountForms(this.user.id).subscribe(response => {
      if (response.status < 205) {
        this.onSuccessSnackBar();
        this.refreshData();
      } else {
        this.onErrorSnackBar();
      }
    }, () => {
      this.onErrorSnackBar();
    });
  }

  deleteQuestions() {
    this.httpService.deleteAccountQuestions(this.user.id).subscribe(response => {
      if (response.status < 205) {
        this.onSuccessSnackBar();
        this.refreshData();
      } else {
        this.onErrorSnackBar();
      }
    }, () => {
      this.onErrorSnackBar();
    });
  }

  deleteAnswers() {
    this.httpService.deleteAccountAnswers(this.user.id).subscribe(response => {
      if (response.status < 205) {
        this.onSuccessSnackBar();
        this.refreshData();
      } else {
        this.onErrorSnackBar();
      }
    }, () => {
      this.onErrorSnackBar();
    });
  }

  private onSuccessSnackBar() {
    this._matSnackBar.open('Pomyślnie usunięto dane', 'Ok', { duration: 1000 });
  }

  private onErrorSnackBar() {
    this._matSnackBar.open('Wystąpił błąd', 'Ok', { duration: 1000 });
  }

  private refreshData() {
    this.pending = true;
    this.httpService.getAccountDetails(this.user.id).subscribe(details => {
      this.pending = false;
      if (details) {
        this.accountDetails = details;
      } else {
        this._matSnackBar.open('Błąd podczas pobierania danych', 'Ok', { duration: 1500 });
      }
    }, () => {
      this.pending = false;
      this._matSnackBar.open('Błąd podczas pobierania danych', 'Ok', { duration: 1500 });
    });
  }
}
