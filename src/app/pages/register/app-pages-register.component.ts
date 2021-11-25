import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { NewAccount } from '../../spec/defs';
import { MatRadioChange } from '@angular/material/radio';
import { FormBuilder } from '@angular/forms';
import { MoneySandboxService } from '../../services/money-sandbox.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mr-app-pages-register',
  templateUrl: 'app-pages-register.component.html',
  styleUrls: ['app-pages-register.component.scss'],
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

  constructor(
    private formBuilder: FormBuilder,
    private moneySandboxService: MoneySandboxService,
    private router: Router
  ) {}

  onSubmit() {
    this.moneySandboxService
      .register(this.mapRegisterAccountFormGroupIntoNewAccount())
      .subscribe(() => this.router.navigateByUrl('/'));
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
      accountType: this.selectedAccountType,
    };
  }
}
