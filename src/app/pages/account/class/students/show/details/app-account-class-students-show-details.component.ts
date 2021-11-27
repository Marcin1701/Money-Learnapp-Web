import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppAccountClassStudentsShowComponent, StudentTableModel} from '../app-account-class-students-show.component';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MoneySandboxService} from '../../../../../../services/money-sandbox.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'mr-app-account-class-students-show-details',
  templateUrl: 'app-account-class-students-show-details.component.html',
  styleUrls: ['app-account-class-students-show-details.component.scss'],
})
export class AppAccountClassStudentsShowDetailsComponent {

  checked: boolean;

  constructor(public dialogRed: MatDialogRef<AppAccountClassStudentsShowComponent>,
              @Inject(MAT_DIALOG_DATA) public student: StudentTableModel,
              private httpService: MoneySandboxService,
              private _snackBar: MatSnackBar) {
    this.checked = student.isCreatorAllowed !== 'Zablokowany';
  }

  changeCheckbox(checked: boolean) {
    if (checked) {
      this.student.isCreatorAllowed = 'Zezwolono';
    } else {
      this.student.isCreatorAllowed = 'Zablokowany';
    }
    this.httpService.toggleCreatorAllowance(this.student.id).subscribe(
      () => { this._snackBar.open('Udało się zmienić uprawnienia', 'Ok', {duration: 1000}); },
      () => { this._snackBar.open('Nie udało się zmienić uprawnień', 'Ok', {duration: 1000}); }
    );
  }
}
