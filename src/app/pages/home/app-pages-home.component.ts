import {Component, OnInit} from '@angular/core';
import {MoneySandboxService} from '../../services/money-sandbox.service';
import {Router} from '@angular/router';
import {AccountResponse} from '../../spec/defs';
import {LogoutService} from '../../services/logout.service';

@Component({
  selector: 'mr-app-pages-home',
  templateUrl: 'app-pages-home.component.html',
})
export class AppPagesHomeComponent implements OnInit {
  isLoggedIn = false;
  user: AccountResponse;

  constructor(private router: Router,
              private httpService: MoneySandboxService,
              private logoutService: LogoutService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.httpService.getAccount().subscribe(account => this.user = account);
    }
  }

  logout() {
   this.logoutService.logout();
  }
}
