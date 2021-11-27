import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'mr-app-account-class-navbar',
  templateUrl: 'app-account-class-navbar.component.html',
  styleUrls: ['app-account-class-navbar.component.scss'],
})
export class AppAccountClassNavbarComponent {

  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(null);
  }

  return() {
    this.router.navigateByUrl('/account').then(null);
  }
}
