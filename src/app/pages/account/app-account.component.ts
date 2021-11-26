import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AccountResponse} from '../../spec/defs';
import {MoneySandboxService} from '../../services/money-sandbox.service';

@Component({
  selector: 'mr-app-account',
  templateUrl: 'app-account.component.html',
  styleUrls: ['app-account.component.scss'],
})
export class AppAccountComponent implements OnInit {
  token: string | null;

  account: AccountResponse;

  constructor(private router: Router, private httpService: MoneySandboxService) {}

  ngOnInit(): void {
    const token = 'Your token: ' + localStorage.getItem('token');
    if (localStorage.getItem('token')) {
      this.token = token;
      this.httpService.getAccount().subscribe(account => this.account = account);
    } else {
      this.router.navigateByUrl('/').then(null);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(null);
  }

  translateAccountType(accountType: string): string {
    switch (accountType) {
      case 'teacher': return 'Nauczyciel';
      case 'student': return 'Uczeń';
    }
    return '';
  }
}
