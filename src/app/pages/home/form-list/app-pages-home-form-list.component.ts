import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MoneySandboxService} from '../../../services/money-sandbox.service';
import {FormResponse, HomeFormResponse} from '../../../spec/defs';


@Component({
  selector: 'mr-app-pages-home-form-list',
  templateUrl: 'app-pages-home-form-list.component.html',
  styleUrls: ['app-pages-home-form-list.component.scss']
})
export class AppPagesHomeFormListComponent implements OnInit {

  forms: HomeFormResponse[];

  constructor(private router: Router, private httpService: MoneySandboxService) {
  }

  ngOnInit() {
    this.httpService.getHomePageListForms().subscribe(forms => {
      this.forms = forms;
    });
  }

  answer(id: string) {
    window.open(this.router.serializeUrl(this.router.createUrlTree(
        [`/answer`],
        { queryParams: { id: id }})),
      '_blank');
  }
}