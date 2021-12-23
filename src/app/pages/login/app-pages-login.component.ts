import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MoneySandboxService } from '../../services/money-sandbox.service';
import { LoginRequest } from '../../spec/defs';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mr-app-pages-login',
  templateUrl: 'app-pages-login.component.html',
  styleUrls: [ 'app-pages-login.component.scss' ],
})
export class AppPagesLoginComponent {
  loginFormGroup = this.formBuilder.group({
    login: [ '', Validators.required ],
    password: [ '', Validators.required ],
  });
  pendingLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private moneySandboxService: MoneySandboxService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private roleService: RoleService,
  ) {
  }

  onSubmit() {
    this.pendingLogin = true;
    this.moneySandboxService
      .login(this.mapLoginAccountFormGroupIntoLoginRequest())
      .subscribe((jwt) => {
        if (jwt) {
          localStorage.setItem('token', jwt.jsonWebToken);
          this.moneySandboxService.getAccountRole().subscribe(role => {
            this.roleService.setRole(role.role);
            this.pendingLogin = false;
            this.router.navigateByUrl('/').then(null);
          }, () => {
            this.pendingLogin = false;
            this._snackBar.open('Wystąpił błąd!', 'Ok', { duration: 2000 });
          });
        }
      }, (error) => {
        this.pendingLogin = false;
        if (error.status === 401) {
          this._snackBar.open('Niepoprawne dane logowania!', 'Ok', { duration: 2000 });
        } else {
          this._snackBar.open('Wystąpił nieoczekiwany błąd!', 'Ok', { duration: 2000 });
        }
      });
  }

  private mapLoginAccountFormGroupIntoLoginRequest(): LoginRequest {
    return {
      login: this.loginFormGroup.controls['login'].value,
      password: this.loginFormGroup.controls['password'].value,
    };
  }
}
