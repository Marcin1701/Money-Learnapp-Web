import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {ErrorStateMatcherClass} from '../../common/matchers/ErrorStateMatcher.class';
import {NewAccount} from '../../spec/Models';
import {MatRadioChange} from '@angular/material/radio';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'mr-app-pages-register',
  templateUrl: 'app-pages-register.component.html',
  styleUrls: ['app-pages-register.component.scss']
})
export class AppPagesRegisterComponent {
  registerAccountFormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });
  selectedAccountType = 'student';
  newAccount: NewAccount;

  constructor(private formBuilder: FormBuilder) {
  }

  onSubmit() {
    console.log(this.mapRegisterAccountFormGroupIntoNewAccount());
  }

  changeRadioValue($event: MatRadioChange) {
    this.selectedAccountType = $event.value;
  }

  private mapRegisterAccountFormGroupIntoNewAccount(): NewAccount {
    return {
      firstName: this.registerAccountFormGroup.controls['firstName'].value,
      lastName: this.registerAccountFormGroup.controls['lastName'].value,
      email: this.registerAccountFormGroup.controls['email'].value,
      login: this.registerAccountFormGroup.controls['login'].value,
      password: this.registerAccountFormGroup.controls['password'].value,
      accountType: this.selectedAccountType
    };
  }
}
