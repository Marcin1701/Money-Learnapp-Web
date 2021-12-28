import { Component, OnInit } from '@angular/core';
import { AnswersSummary } from '../../../../spec/defs';
import { MoneySandboxService } from '../../../../services/money-sandbox.service';

@Component({
  selector: 'mr-app-account-activity-summary',
  templateUrl: 'app-account-activity-summary.component.html',
  styleUrls: [ 'app-account-activity-summary.component.scss' ],
})
export class AppAccountActivitySummaryComponent implements OnInit {

  answersSummary: AnswersSummary;

  pending = true;

  constructor(private httpService: MoneySandboxService) {
  }

  ngOnInit(): void {
    this.httpService.getAnswersSummary().subscribe(summary => {
      if (summary) {
        this.answersSummary = summary;
        this.pending = false;
      }
    });
  }
}
