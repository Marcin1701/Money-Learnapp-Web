import {Component, OnInit} from '@angular/core';
import {MoneySandboxService} from '../../services/money-sandbox.service';
import {Router} from '@angular/router';
import {AccountResponse} from '../../spec/defs';

@Component({
  selector: 'mr-app-pages-home',
  templateUrl: 'app-pages-home.component.html',
})
export class AppPagesHomeComponent implements OnInit {
  isLoggedIn = false;
  user: AccountResponse;

  constructor(private router: Router, private httpService: MoneySandboxService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.httpService.getAccount().subscribe(account => this.user = account);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(null);
    this.isLoggedIn = false;
  }
}
