import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MoneySandboxService} from '../../../../../services/money-sandbox.service';
import {SingleChoiceQuestionResponse} from '../../../../../spec/defs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'mr-app-show-single-choice-component',
  templateUrl: 'app-show-single-choice.component.html',
  styleUrls: ['app-show-single-choice.component.scss'],
})
export class AppShowSingleChoiceComponent implements OnInit, AfterViewInit {

  @Input()
  select: boolean;

  @Output()
  selectItem = new EventEmitter<string>();

  singleChoiceQuestions = new MatTableDataSource<SingleChoiceTableModel>();
  selection = new SelectionModel<SingleChoiceTableModel>(true, []);
  questions: SingleChoiceQuestionResponse[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns: string[];

  constructor(private httpService: MoneySandboxService, private _snackBar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngAfterViewInit(): void {
    this.singleChoiceQuestions.paginator = this.paginator;
    this.singleChoiceQuestions.sort = this.sort;
  }

  ngOnInit(): void {
    this.select ?
      this.columns = ['select', 'index', 'name', 'text', 'date', 'optionCount'] :
      this.columns = ['index', 'name', 'text', 'date', 'optionCount'];
    this.httpService.loadSingleChoiceQuestions().subscribe(result => {
      if (result.length) {
        this.questions = result;
        this.mapSingleChoiceToTableModels(result);
      }
    }, () => {
      this._snackBar.open('Nieoczekiwany błąd!', 'Ok', { duration: 2000 });
    });
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`).then(null);
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(null);
    }
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

  checkboxLabel(row?: SingleChoiceTableModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`;
  }

  isAllSelected() {
    return this.selection.selected.length === this.singleChoiceQuestions.data.length;
  }
}

export interface SingleChoiceTableModel {
  index: number;
  name: string;
  text: string;
  date: string;
  optionCount: number;
}
