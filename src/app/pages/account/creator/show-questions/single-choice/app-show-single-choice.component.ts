import {Component, OnInit, ViewChild} from '@angular/core';
import {MoneySandboxService} from '../../../../../services/money-sandbox.service';
import {SingleChoiceQuestionResponse} from '../../../../../spec/defs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'mr-app-show-single-choice-component',
  templateUrl: 'app-show-single-choice.component.html',
  styleUrls: ['app-show-single-choice.component.scss'],
})
export class AppShowSingleChoiceComponent implements OnInit {

  singleChoiceQuestions = new MatTableDataSource<SingleChoiceTableModel>();
  singleChoicePagedQuestions = new MatTableDataSource<SingleChoiceTableModel>();

  columns = ['index', 'name', 'text', 'date', 'optionCount'];

  pageSize = 5;
  currentPage = 1;

  constructor(private httpService: MoneySandboxService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.httpService.loadSingleChoiceQuestions().subscribe(result => {
      if (result.length) {
        this.mapSingleChoiceToTableModels(result);
        this.singleChoicePagedQuestions = this.singleChoiceQuestions;
        this.changePage();
      }
    }, () => {
      this._snackBar.open('Nieoczekiwany błąd!', 'Ok', { duration: 2000 });
    });
  }

  private mapSingleChoiceToTableModels(questions: SingleChoiceQuestionResponse[]) {
    this.singleChoiceQuestions.data = questions.map((question, index) => {
      return {
        index: index + 1,
        name: question.question.name,
        text: question.question.question,
        date: question.creationDate,
        optionCount: question.question.singleChoiceOptions.length,
      } as SingleChoiceTableModel;
    });
  }

  changePage($event?: PageEvent) {
    // TODO PAGINACJA
/*    const temporaryQuestions = this.singleChoiceQuestions.data;
    if ($event) {
      this.singleChoicePagedQuestions.data =
    } else {
      this.singleChoicePagedQuestions.data = temporaryQuestions.splice(this.currentPage - 1, this.pageSize);
    }*/
  }
}

export interface SingleChoiceTableModel {
  index: number;
  name: string;
  text: string;
  date: string;
  optionCount: number;
}
