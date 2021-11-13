import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'mr-app-common-navbar',
  templateUrl: 'app-common-navbar.component.html',
  styleUrls: ['app-common-navbar.component.scss']
})
export class AppCommonNavbarComponent {
  toggled = false;

  constructor(private router: Router) {
  }

  toggle() {
    this.toggled = !this.toggled;
    console.log(this.toggled);
  }

  isRedirected(): boolean {
    return this.router.url !== '/creator';
  }
}
