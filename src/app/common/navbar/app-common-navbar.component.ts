import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'mr-app-common-navbar',
  templateUrl: 'app-common-navbar.component.html',
  styleUrls: ['app-common-navbar.component.scss']
})
export class AppCommonNavbarComponent {

  constructor(private router: Router) {
  }

  isRedirected(): boolean {
    return this.router.url !== '/creator';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(null);
  }
}
