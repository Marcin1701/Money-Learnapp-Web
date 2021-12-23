import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppCreatorSingleChoiceComponent } from '../../new-question/questions-container/single-choice/app-creator-single-choice.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormPublicityResponse, FormResponse } from '../../../../../spec/defs';
import { MoneySandboxService } from '../../../../../services/money-sandbox.service';


@Component({
  selector: 'mr-account-creator-form-details-component',
  templateUrl: 'app-account-creator-form-details.component.html',
  styleUrls: [ 'app-account-creator-form-details.component.scss' ],
})
export class AppAccountCreatorFormDetailsComponent implements OnInit {

  pendingPublish = false;
  formPublicityResponse: FormPublicityResponse;
  pending = false;

  constructor(public dialogRef: MatDialogRef<AppCreatorSingleChoiceComponent>,
              @Inject(MAT_DIALOG_DATA) public form: FormResponse,
              private _matSnackBar: MatSnackBar,
              private httpService: MoneySandboxService) {
  }

  ngOnInit(): void {
    this.pending = true;
    this.httpService.isFormInPublish(this.form.id).subscribe(response => {
      if (response) {
        this.pendingPublish = false;
        this.pending = false;
        this.formPublicityResponse = response;
      }
    }, () => {
      this.pendingPublish = false;
      this.pending = false;
    });
  }

  publish() {
    this.pending = true;
    if (!this.pendingPublish) {
      this.httpService.requestPublish(this.form.id).subscribe(response => {
        if (response) {
          this.pendingPublish = true;
          this.formPublicityResponse = response;
          this._matSnackBar.open('Pomyślnie zgłoszono arkusz', 'Ok', { duration: 2000 });
          this.pending = false;
        }
      });
    } else {
      this._matSnackBar.open('Arkusz oczekuje na akceptację', 'Ok', { duration: 500 });
      this.pending = false;
    }
  }
}
