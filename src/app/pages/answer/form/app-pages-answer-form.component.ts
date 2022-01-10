import { Component, Input, OnInit } from '@angular/core';
import { AnswersRequest, FormToAnswerResponse, ResultsResponse } from '../../../spec/defs';
import { MoneySandboxService } from '../../../services/money-sandbox.service';
import { MatDialog } from '@angular/material/dialog';
import { AppPagesAnswerDialogComponent } from './answer-dialog/app-pages-answer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'mr-app-pages-answer-form',
  templateUrl: 'app-pages-answer-form.component.html',
  styleUrls: [ './app-pages-answer-form.component.scss' ],
})
export class AppPagesAnswerFormComponent implements OnInit {

  @Input()
  form: FormToAnswerResponse;

  @Input()
  isLoggedIn: boolean;

  @Input()
  isPreview: boolean;

  @Input()
  userId: string;

  answer: AnswersRequest = { formId: '', answers: [] };
  answerer: string;
  sendingAnswers = false;
  result: ResultsResponse;
  time = 0;
  interval: any;

  constructor(private httpService: MoneySandboxService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.form) {
      this.answer.formId = this.form?.id;
      this.time = this.form.answerTime;
      if (!this.isPreview) {
        this.startTimer();
      }
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time = this.time - 1;
      }
      if (this.time === 0) {
        clearInterval(this.interval);
        if (this.router.url.includes('answer')) {
          this._snackBar.open('Upłynął czas', '', { duration: 2000 });
        }
        this.send();
      }
    }, 1000);
  }

  singleChoiceChanged($event: {id: string, value: number}) {
    this.removePreviousAnswer($event.id);
    this.answer.answers.push({
      questionType: 'SINGLE_CHOICE',
      answer: {
        questionId: $event.id,
        optionChosen: $event.value
      },
    });
  }

  multipleChoiceChanged($event: {id: string; value: number[]}) {
    this.removePreviousAnswer($event.id);
    this.answer.answers.push({
      questionType: 'MULTIPLE_CHOICE',
      answer: {
        questionId: $event.id,
        optionChosen: $event.value
      },
    });
  }

  orderedListChanged($event: {id: string; value: string[]}) {
    this.removePreviousAnswer($event.id);
    this.answer.answers.push({
      questionType: 'ORDERED_LIST',
      answer: {
        questionId: $event.id,
        optionChosen: $event.value
      },
    });
  }

  dragAndDropChanged($event: {id: string; value: number}) {
    this.removePreviousAnswer($event.id);
    this.answer.answers.push({
      questionType: 'DRAG_AND_DROP',
      answer: {
        questionId: $event.id,
        optionChosen: $event.value
      },
    });
  }

  send() {
    clearInterval(this.interval);
    this.time = 0;
    if (this.router.url.includes('answer')) {
      if (!this.isLoggedIn && !this.isPreview) {
        const dialogRef = this.dialog.open(AppPagesAnswerDialogComponent, {
          width: '300px',
          height: '200px',
          data: this.answerer,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.answer.answerer = result;
            this.sendAnswers();
          }
          dialogRef.close();
        });
      } else {
        this.sendAnswers();
      }
    }
  }

  return() {
    this.router.navigateByUrl('/').then(null);
  }

  private sendAnswers() {
    if (this.userId.length) {
      this.answer.userId = this.userId;
    }
    this.sendingAnswers = true;
    this.httpService.addAnswers(this.answer).subscribe(results => {
      if (results) {
        this.sendingAnswers = false;
        this.result = results;
      }
    }, () => {
      this.sendingAnswers = false;
      this._snackBar.open('Wystąpił błąd', 'Ok', { duration: 1000 });
    });
  }

  private removePreviousAnswer(questionId: string) {
    if (this.answer.answers.some(answer => answer.answer?.questionId === questionId)) {
      this.answer.answers.forEach((answer, index) => {
        if (answer.answer?.questionId === questionId) {
          this.answer.answers.splice(index, 1);
        }
      });
    }
  }
}
