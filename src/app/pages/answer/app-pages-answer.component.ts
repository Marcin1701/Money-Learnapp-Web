import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoneySandboxService } from '../../services/money-sandbox.service';
import { FormToAnswerResponse } from '../../spec/defs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mr-app-pages-answer',
  templateUrl: 'app-pages-answer.component.html',
  styleUrls: [ './app-pages-answer.component.scss' ],
})
export class AppPagesAnswerComponent implements OnInit {

  isPreview = false;
  formToAnswer: FormToAnswerResponse;
  pending = true;
  previewQuestions: any;
  isLoggedIn = false;
  userId = '';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
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
              this.isLoggedIn = true;
            }
          });
        }
      });
    }
  }

  ngOnInit(): void {
    if (!this.isPreview) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['id'] && !localStorage.getItem('form_id') && !localStorage.getItem('preview_form')) {
          this.getForm(params['id']);
        } else if (localStorage.getItem('form_id')) {
          const formId = localStorage.getItem('form_id');
          this.getForm(formId!);
        } else {
          this.router.navigateByUrl('/').then(null);
        }
      });
    }
  }

  private getForm(formId: string) {
    this.httpService.getFormToAnswerById(formId).subscribe(form => {
      if (form) {
        this.pending = false;
        this.formToAnswer = form;
      }
    });
  }

  private mapLocalStorageFormToAnswerForm(form: string) {
    this.pending = true;
    localStorage.removeItem('preview_form');
    const localStorageForm = JSON.parse(form);
    const questionIds = {
      ids: localStorageForm.questionIds
    };
    this.httpService.getQuestionsToPreview(questionIds).subscribe(questions => {
      if (questions) {
        this.pending = false;
        this.formToAnswer = {
          id: '1',
          name: localStorageForm.name,
          difficulty: localStorageForm.difficulty,
          creationDate: 'TODAY',
          answerTime: localStorageForm.answerTime,
          questions: questions
        };
      }
    })
  }
}
