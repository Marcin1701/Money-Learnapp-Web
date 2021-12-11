import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoneySandboxService} from '../../services/money-sandbox.service';
import {FormToAnswerResponse} from '../../spec/defs';

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

  constructor(private activatedRoute: ActivatedRoute, private httpService: MoneySandboxService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['preview'] && localStorage.getItem('preview_form')) {
        this.isPreview = params['preview'];
        this.pending = false;
        // tslint:disable-next-line:no-non-null-assertion
        this.mapLocalStorageFormToAnswerForm(localStorage.getItem('preview_form')!);
      }
    });
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
