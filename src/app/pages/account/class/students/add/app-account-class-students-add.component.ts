import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MoneySandboxService} from '../../../../../services/money-sandbox.service';
import {StudentRequest} from '../../../../../spec/defs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCheckboxChange} from '@angular/material/checkbox';


@Component({
  selector: 'mr-app-account-class-students-add',
  templateUrl: 'app-account-class-students-add.component.html',
  styleUrls: ['app-account-class-students-add.component.scss'],
})
export class AppAccountClassStudentsAddComponent {

  newStudentFormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [],
    login: ['', Validators.required],
    className: [],
  });

  temporaryPassword = '';
  teacherClassNames: string[] = [];
  isCreatorAllowed = false;

  constructor(private formBuilder: FormBuilder, private httpService: MoneySandboxService, private _snackBar: MatSnackBar) {
  }

  onSubmit() {
    this.httpService.addNewStudent(this.mapNewStudent()).subscribe(generatedPassword => {
      if (generatedPassword) {
        this.temporaryPassword = generatedPassword.generatedPassword;
        this._snackBar.open('Dodano ucznia', 'Ok', { duration: 3000 });
      }
    }, (error) => {
      if (error.status === 400) {
        this._snackBar.open('Uczeń z podanym loginem istnieje', 'Ok', { duration: 3000 });
      } else {
        this._snackBar.open('Nie udało się dodać ucznia', 'Ok', { duration: 3000 });
      }
    });
  }

  getClasses() {

  }

  private mapNewStudent(): StudentRequest {
    return {
      email: this.newStudentFormGroup.controls['email'].value,
      login: this.newStudentFormGroup.controls['login'].value,
      firstName: this.newStudentFormGroup.controls['firstName'].value,
      lastName: this.newStudentFormGroup.controls['lastName'].value,
      accountType: 'student',
      isCreatorAllowed: this.isCreatorAllowed,
      isTemporaryPasswordActive: true,
    };
  }

  changeCheckbox($event: MatCheckboxChange) {
    this.isCreatorAllowed = $event.checked;
  }
}
