import {Component, Input} from '@angular/core';
import {LogoutService} from '../../../services/logout.service';

@Component({
  selector: 'mr-app-pages-home-menu',
  templateUrl: 'app-pages-home-menu.component.html',
  styleUrls: ['app-pages-home-menu.component.scss']
})
export class AppPagesHomeMenuComponent {

  constructor(public logoutService: LogoutService) {
  }

  @Input()
  isLoggedIn: boolean;
}
