import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MoneySandboxService } from '../../services/money-sandbox.service';
import { Router } from '@angular/router';
import { AccountResponse } from '../../spec/defs';
import { LogoutService } from '../../services/logout.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'mr-app-pages-home',
  templateUrl: 'app-pages-home.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppPagesHomeComponent implements OnInit {
  isLoggedIn = false;
  user: AccountResponse;
  insideGame = false;

  constructor(private router: Router,
              private httpService: MoneySandboxService,
              private logoutService: LogoutService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.validateToken().subscribe(response => {
        if (response) {
          this.isLoggedIn = true;
          this.httpService.getAccount().subscribe(account => this.user = account);
        } else {
          this.isLoggedIn = false;
          localStorage.removeItem('token');
        }
      });
    }
  }

  logout() {
    this.logoutService.logout();
  }

  changeTab($event: MatTabChangeEvent) {
    this.insideGame = $event.index === 1;
  }
}
