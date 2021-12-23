import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'mr-app-common-navbar',
  templateUrl: 'app-common-navbar.component.html',
  styleUrls: [ 'app-common-navbar.component.scss' ],
})
export class AppCommonNavbarComponent {

  constructor(private router: Router,
              private logoutService: LogoutService) {
  }

  logout() {
    this.logoutService.logout();
  }

  return() {
    this.router.navigateByUrl('/account').then(null);
  }
}
