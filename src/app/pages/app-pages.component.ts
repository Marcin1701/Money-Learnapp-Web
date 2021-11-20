import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'mr-app-pages',
  templateUrl: 'app-pages.component.html',
  styleUrls: ['./app-pages.component.scss']
})
export class AppPagesComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/account').then(null);
    }
  }
}
