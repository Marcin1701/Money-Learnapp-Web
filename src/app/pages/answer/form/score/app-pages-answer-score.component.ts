import {Component, Input} from '@angular/core';
import {ResultsResponse} from '../../../../spec/defs';


@Component({
  selector: 'mr-app-pages-answer-score',
  templateUrl: 'app-pages-answer-score.component.html',
  styleUrls: ['./app-pages-answer-score.component.scss'],
})
export class AppPagesAnswerScoreComponent {
  @Input()
  score: ResultsResponse;

}
