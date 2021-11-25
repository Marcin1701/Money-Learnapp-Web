import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mr-app-account',
  templateUrl: 'app-account.component.html',
  styleUrls: ['app-account.component.scss'],
})
export class AppAccountComponent implements OnInit {
  token: string | null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = 'Your token: ' + localStorage.getItem('token');
    if (localStorage.getItem('token')) {
      this.token = token;
      // Construct creator
      this.router.navigateByUrl('/creator').then(null);
    } else {
      this.router.navigateByUrl('/').then(null);
    }
  }

  logout() {}
}
