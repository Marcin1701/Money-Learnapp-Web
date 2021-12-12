import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppCreatorSingleChoiceComponent} from '../../new-question/questions-container/single-choice/app-creator-single-choice.component';
import {FormTableModel} from '../app-account-creator-show-forms.component';


@Component({
  selector: 'mr-account-creator-form-details-component',
  templateUrl: 'app-account-creator-form-details.component.html',
  styleUrls: ['app-account-creator-form-details.component.scss'],
})
export class AppAccountCreatorFormDetailsComponent {

  constructor(public dialogRef: MatDialogRef<AppCreatorSingleChoiceComponent>,
              @Inject(MAT_DIALOG_DATA) public form: FormTableModel) {
  }
}
