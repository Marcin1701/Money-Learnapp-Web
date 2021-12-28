import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoneySandboxService } from '../../../services/money-sandbox.service';
import { HomeFormResponse } from '../../../spec/defs';
import { AvatarsService } from '../../../services/avatars.service';


@Component({
  selector: 'mr-app-pages-home-form-list',
  templateUrl: 'app-pages-home-form-list.component.html',
  styleUrls: [ 'app-pages-home-form-list.component.scss' ]
})
export class AppPagesHomeFormListComponent implements OnInit {

  forms: HomeFormResponse[];
  formAvatars: string[] = [];
  pending = true;

  constructor(private router: Router, private httpService: MoneySandboxService, private avatars: AvatarsService) {
  }

  ngOnInit() {
    this.httpService.getHomePageListForms().subscribe(forms => {
      if (forms) {
        this.pending = false;
        this.forms = forms;
        this.getRandomAvatarUrls();
      }
    });
  }

  answer(id: string) {
    localStorage.setItem('form_id', id);
    this.router.navigateByUrl('answer').then(null);
  }

  private getRandomAvatarUrls() {
    this.forms.forEach(() => this.formAvatars.push(this.avatars.getRandomAvatarUrl('./../../../../assets/avatars')));
  }
}
