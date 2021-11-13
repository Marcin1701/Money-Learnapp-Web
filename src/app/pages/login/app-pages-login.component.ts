import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MoneySandboxService} from '../../services/money-sandbox.service';
import {LoginRequest} from '../../spec/defs';
import {Router} from '@angular/router';

@Component({
  selector: 'mr-app-pages-login',
  templateUrl: 'app-pages-login.component.html',
  styleUrls: ['app-pages-login.component.scss']
})
export class AppPagesLoginComponent {
  loginFormGroup = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private moneySandboxService: MoneySandboxService,
              private router: Router) {
  }


  onSubmit() {
    this.moneySandboxService.login(this.mapLoginAccountFormGroupIntoLoginRequest()).subscribe(jwt => {
      if (jwt) {
        localStorage.setItem('token', jwt.jsonWebToken);
        this.router.navigateByUrl('/account');
      }
    });
  }

  private mapLoginAccountFormGroupIntoLoginRequest(): LoginRequest {
    return {
      login: this.loginFormGroup.controls['login'].value,
      password: this.loginFormGroup.controls['password'].value
    };
  }

}
