import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MoneySandboxService} from '../services/money-sandbox.service';

@Component({
  selector: 'mr-app-pages',
  templateUrl: 'app-pages.component.html',
  styleUrls: ['./app-pages.component.scss'],
})
export class AppPagesComponent implements OnInit {
  constructor(private router: Router, private httpService: MoneySandboxService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.validateToken(token).subscribe(result => {
        if (result) {
          localStorage.setItem('token', result.jsonWebToken);
          this.router.navigateByUrl('/account').then(null);
        } else {
          localStorage.removeItem('token');
        }
      });
    }
  }
}
