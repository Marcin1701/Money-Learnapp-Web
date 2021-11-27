import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppAccountClassStudentsShowComponent, StudentTableModel} from '../app-account-class-students-show.component';
import {MatCheckboxChange} from '@angular/material/checkbox';


@Component({
  selector: 'mr-app-account-class-students-show-details',
  templateUrl: 'app-account-class-students-show-details.component.html',
  styleUrls: ['app-account-class-students-show-details.component.scss'],
})
export class AppAccountClassStudentsShowDetailsComponent {

  checked: boolean;

  constructor(public dialogRed: MatDialogRef<AppAccountClassStudentsShowComponent>,
              @Inject(MAT_DIALOG_DATA) public student: StudentTableModel) {
    this.checked = student.isCreatorAllowed !== 'Zablokowany';
  }

  changeCheckbox(checked: boolean) {
    if (checked) {
      this.student.isCreatorAllowed = 'Zezwolono';
    } else {
      this.student.isCreatorAllowed = 'Zablokowany';
    }
  }
}
