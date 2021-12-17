import {Component} from '@angular/core';
import {LogoutService} from '../../../services/logout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'mr-app-account-activity',
  templateUrl: 'app-account-activity.component.html',
  styleUrls: ['app-account-activity.component.scss'],
})
export class AppAccountActivityComponent {

  constructor(private logoutService: LogoutService, private router: Router) {
  }

  logout() {
    this.logoutService.logout();
  }

  return() {
    this.router.navigateByUrl('/account').then(null);
  }
}
