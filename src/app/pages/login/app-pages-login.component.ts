import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ErrorStateMatcherClass} from '../../common/matchers/ErrorStateMatcher.class';

@Component({
  selector: 'mr-app-pages-login',
  templateUrl: 'app-pages-login.component.html',
  styleUrls: ['app-pages-login.component.scss']
})
export class AppPagesLoginComponent {
  loginFormControl = new FormControl('', [Validators.required]);
  matcher = new ErrorStateMatcherClass();

}
