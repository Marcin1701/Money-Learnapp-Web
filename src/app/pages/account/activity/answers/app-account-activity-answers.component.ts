import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormResponse } from '../../../../spec/defs';
import { FormTableModel } from '../../creator/show-forms/app-account-creator-show-forms.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MoneySandboxService } from '../../../../services/money-sandbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mr-app-account-activity-answers',
  templateUrl: 'app-account-activity-answers.component.html',
  styleUrls: [ 'app-account-activity-answers.component.scss' ],
})
export class AppAccountActivityAnswersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  forms = new MatTableDataSource<FormTableModel>();
  responseForms: FormResponse[] = [];
  pending = true;

  columns = [ 'index', 'name', 'answerTime', 'creationDate', 'numberOfQuestions', 'isPublic' ];

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private httpService: MoneySandboxService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getForms();
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${ sortState.direction }ending`).then(null);
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(null);
    }
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.forms.filter = filterValue.trim().toLowerCase();
  }

  selectAnswer(row: FormTableModel) {

  }

  private mapFormResponseToFormTableModel(forms: FormResponse[]) {
    this.responseForms = forms;
    this.forms.data = forms.map((form, index) => {
      return {
        index: index + 1,
        name: form.name,
        answerTime: form.answerTime,
        creationDate: form.creationDate,
        numberOfQuestions: form.questions,
        numberOfAnswers: form.answers,
        isPublic: form.isPublic ? 'Tak' : 'Nie',
      } as FormTableModel;
    });
  }

  private getForms() {
    this.httpService.getAnsweredForms().subscribe(forms => {
      this.pending = false;
      if (forms && forms.length) {
        this.mapFormResponseToFormTableModel(forms);
      } else {
        this.forms.data = [];
        this.responseForms = [];
      }
    }, () => {
      this.pending = false;
      this._snackBar.open('Nie można pobrać danych', '', { duration: 1000 });
    });
  }
}
