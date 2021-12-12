import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AccountResponse} from '../../spec/defs';
import {MoneySandboxService} from '../../services/money-sandbox.service';
import {RoleService} from '../../services/role.service';
import {LogoutService} from '../../services/logout.service';

@Component({
  selector: 'mr-app-account',
  templateUrl: 'app-account.component.html',
  styleUrls: ['app-account.component.scss'],
})
export class AppAccountComponent implements OnInit {
  token: string | null;
  isAdmin = false;
  account: AccountResponse;

  constructor(private router: Router,
              private httpService: MoneySandboxService,
              private roleService: RoleService,
              private logoutService: LogoutService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.httpService.getAccount().subscribe(account => this.account = account);
      this.isAdmin = this.roleService.getRole() === 'ADMIN';
      console.log(this.roleService.getRole());
    } else {
      this.router.navigateByUrl('/').then(null);
    }
  }

  logout() {
    this.logoutService.logout();
  }
}
