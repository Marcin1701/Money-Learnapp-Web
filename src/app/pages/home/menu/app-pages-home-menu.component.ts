import { Component, Input } from '@angular/core';
import { LogoutService } from '../../../services/logout.service';
import { RoleService } from '../../../services/role.service';
import { MoneySandboxService } from '../../../services/money-sandbox.service';

@Component({
  selector: 'mr-app-pages-home-menu',
  templateUrl: 'app-pages-home-menu.component.html',
  styleUrls: [ 'app-pages-home-menu.component.scss' ]
})
export class AppPagesHomeMenuComponent {


  @Input()
  isLoggedIn: boolean;

  isAdmin: boolean;

  constructor(public logoutService: LogoutService, private roleService: RoleService, private httpService: MoneySandboxService) {
    this.httpService.getAccountRole().subscribe(role => this.isAdmin = role.role === 'ADMIN');
  }
}
