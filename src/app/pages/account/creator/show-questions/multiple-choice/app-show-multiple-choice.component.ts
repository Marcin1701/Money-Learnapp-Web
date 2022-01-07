import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MultipleChoiceQuestionResponse } from '../../../../../spec/defs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MoneySandboxService } from '../../../../../services/money-sandbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'mr-app-show-multiple-choice-component',
  templateUrl: 'app-show-multiple-choice.component.html',
  styleUrls: [ 'app-show-multiple-choice.component.scss' ],
})
export class AppShowMultipleChoiceComponent implements OnInit, AfterViewInit {
  @Input()
  select: boolean;

  @Output()
  selectItem = new EventEmitter<string>();

  multipleChoiceQuestions = new MatTableDataSource<MultipleChoiceTableModel>();
  selection = new SelectionModel<MultipleChoiceTableModel>(true, []);
  questions: MultipleChoiceQuestionResponse[];
  pending = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns: string[];

  constructor(private httpService: MoneySandboxService, private _snackBar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngAfterViewInit(): void {
    this.multipleChoiceQuestions.paginator = this.paginator;
    this.multipleChoiceQuestions.sort = this.sort;
  }

  ngOnInit(): void {
    this.select ?
      this.columns = [ 'select', 'index', 'name', 'text', 'date', 'optionCount' ] :
      this.columns = [ 'index', 'name', 'text', 'date', 'optionCount', 'delete' ];
    this.httpService.loadMultipleChoiceQuestions().subscribe(result => {
      this.pending = false;
      if (result.length) {
        this.questions = result;
        this.mapMultipleChoiceToTableModels(result);
      }
    }, () => {
      this._snackBar.open('Nieoczekiwany błąd!', 'Ok', { duration: 2000 });
    });
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${ sortState.direction }ending`).then(null);
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(null);
    }
  }

  checkboxLabel(row?: MultipleChoiceTableModel): string {
    if (!row) {
      return `${ this.isAllSelected() ? 'deselect' : 'select' } all`;
    }
    return `${ this.selection.isSelected(row) ? 'deselect' : 'select' } row ${ row.index + 1 }`;
  }

  isAllSelected() {
    return this.selection.selected.length === this.multipleChoiceQuestions.data.length;
  }

  private mapMultipleChoiceToTableModels(questions: MultipleChoiceQuestionResponse[]) {
    this.multipleChoiceQuestions.data = questions.map((question, index) => {
      return {
        index: index + 1,
        name: question.question.name,
        text: question.question.question,
        date: question.creationDate,
        optionCount: question.question.multipleChoiceOptions.length,
      } as MultipleChoiceTableModel;
    });
  }

  deleteQuestion(question: MultipleChoiceTableModel) {
    const toDelete = this.questions[question.index - 1];
    this.httpService.deleteQuestion(toDelete.id).subscribe(response => {
      if (response.status === 200) {
        this.multipleChoiceQuestions.data.splice(question.index - 1, 1)
        this.multipleChoiceQuestions.data = this.multipleChoiceQuestions.data;
      }
    }, () => {
      this._snackBar.open('Wystąpił nieoczekiwany błąd', 'Ok', { duration: 1000 });
    });
  }
}

export interface MultipleChoiceTableModel {
  index: number;
  name: string;
  text: string;
  date: string;
  optionCount: number;
}
