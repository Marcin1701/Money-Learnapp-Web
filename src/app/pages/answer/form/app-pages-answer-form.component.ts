import {Component, Input, OnInit} from '@angular/core';
import {AnswersRequest, FormToAnswerResponse, ResultsResponse} from '../../../spec/defs';
import {MoneySandboxService} from '../../../services/money-sandbox.service';
import {MatDialog} from '@angular/material/dialog';
import {AppCreatorSingleChoiceDialogComponent} from '../../account/creator/new-question/questions-container/single-choice/dialog/app-creator-single-choice-dialog.component';
import {AppPagesAnswerDialogComponent} from './answer-dialog/app-pages-answer-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';


@Component({
  selector: 'mr-app-pages-answer-form',
  templateUrl: 'app-pages-answer-form.component.html',
  styleUrls: ['./app-pages-answer-form.component.scss'],
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

  constructor(private httpService: MoneySandboxService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {
    this.answer.formId = this.form?.id;
  }

  singleChoiceChanged($event: { id: string, value: number }) {
    this.removePreviousAnswer($event.id);
    this.answer.answers.push({
      questionType: 'SINGLE_CHOICE',
      answer: {
        questionId: $event.id,
        optionChosen: $event.value
      },
    });
  }

  send() {
    if (!this.isLoggedIn) {
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

  private sendAnswers() {
    if (this.userId.length) {
      this.answer.userId = this.userId;
    }
    console.log(this.answer);
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

  return() {
    this.router.navigateByUrl('/').then(null);
  }
}
