import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'mr-app-pages-answer',
  templateUrl: 'app-pages-answer.component.html',
  styleUrls: ['./app-pages-answer.component.scss'],
})
export class AppPagesAnswerComponent {

  isPreview = false;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['preview'] && localStorage.getItem('preview_form')) {
        this.isPreview = params['preview'];
        // tslint:disable-next-line:no-non-null-assertion
        this.mapLocalStorageFormToAnswerForm(localStorage.getItem('preview_form')!);
      }
    });
  }

  private mapLocalStorageFormToAnswerForm(form: string | null) {

  }
}
