import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewAccount } from '../../spec/defs';
import { MoneySandboxService } from '../../services/money-sandbox.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mr-app-pages-register',
  templateUrl: 'app-pages-register.component.html',
  styleUrls: [ 'app-pages-register.component.scss' ],
})
export class AppPagesRegisterComponent {
  registerAccountFormGroup = this.formBuilder.group({
    firstName: [ '', Validators.required ],
    lastName: [ '', Validators.required ],
    email: [ '', Validators.required ],
    login: [ '', Validators.required ],
    password: [ '', Validators.required ],
  });
  newAccount: NewAccount;

  constructor(
    private formBuilder: FormBuilder,
    private moneySandboxService: MoneySandboxService,
    private router: Router
  ) {
  }

  onSubmit() {
    this.moneySandboxService
      .register(this.mapRegisterAccountFormGroupIntoNewAccount())
      .subscribe(() => this.router.navigateByUrl('/'));
  }

  private mapRegisterAccountFormGroupIntoNewAccount(): NewAccount {
    return {
      firstName: this.registerAccountFormGroup.controls['firstName'].value,
      lastName: this.registerAccountFormGroup.controls['lastName'].value,
      email: this.registerAccountFormGroup.controls['email'].value,
      login: this.registerAccountFormGroup.controls['login'].value,
      password: this.registerAccountFormGroup.controls['password'].value,
    };
  }
}
