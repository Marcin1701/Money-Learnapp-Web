import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoneySandboxService} from '../../services/money-sandbox.service';
import {FormToAnswerResponse} from '../../spec/defs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'mr-app-pages-answer',
  templateUrl: 'app-pages-answer.component.html',
  styleUrls: ['./app-pages-answer.component.scss'],
})
export class AppPagesAnswerComponent implements OnInit {

  isPreview = false;
  formToAnswer: FormToAnswerResponse;
  pending = true;
  previewQuestions: any;
  isLoggedIn = false;
  userId = '';

  constructor(private activatedRoute: ActivatedRoute,
              private httpService: MoneySandboxService,
              private _matSnackBar: MatSnackBar) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['preview'] && localStorage.getItem('preview_form')) {
        this.isPreview = params['preview'];
        this.pending = false;
        // tslint:disable-next-line:no-non-null-assertion
        this.mapLocalStorageFormToAnswerForm(localStorage.getItem('preview_form')!);
      }
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.validateToken().subscribe(response => {
        if (response) {
          this.httpService.getAccount().subscribe(account => {
            if (account) {
              this.userId = account.id;
            }
          });
        }
      });
    }
  }

  ngOnInit(): void {
    if (!this.isPreview) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['id']) {
          this.httpService.getFormToAnswerById(params['id']).subscribe(form => {
            if (form) {
              this.pending = false;
              this.formToAnswer = form;
            }
          });
        }
       });
    }
  }

  private mapLocalStorageFormToAnswerForm(form: string) {
    const localStorageForm = JSON.parse(form);
    this.formToAnswer = {
      id: '1',
      name: localStorageForm.name,
      difficulty: localStorageForm.difficulty,
      creationDate: 'TODAY',
      // TODO MAPOWANIE NA PYTANIA
      questions: []
    };
  }
}
