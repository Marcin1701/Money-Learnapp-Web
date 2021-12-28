import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DragAndDropQuestionResponse } from '../../../../../spec/defs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MoneySandboxService } from '../../../../../services/money-sandbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'mr-app-show-drag-and-drop-component',
  templateUrl: 'app-show-drag-and-drop.component.html',
  styleUrls: [ 'app-show-drag-and-drop.component.scss' ],
})
export class AppShowDragAndDropComponent implements OnInit, AfterViewInit {
  @Input()
  select: boolean;

  @Output()
  selectItem = new EventEmitter<string>();

  dragAndDropQuestions = new MatTableDataSource<DragAndDropTableModel>();
  selection = new SelectionModel<DragAndDropTableModel>(true, []);
  questions: DragAndDropQuestionResponse[];
  pending = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns: string[];

  constructor(private httpService: MoneySandboxService, private _snackBar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngAfterViewInit(): void {
    this.dragAndDropQuestions.paginator = this.paginator;
    this.dragAndDropQuestions.sort = this.sort;
  }

  ngOnInit(): void {
    this.select ?
      this.columns = [ 'select', 'index', 'name', 'text', 'date', 'optionCount' ] :
      this.columns = [ 'index', 'name', 'text', 'date', 'optionCount' ];
    this.httpService.loadDragAndDropQuestions().subscribe(result => {
      this.pending = false;
      if (result.length) {
        this.questions = result;
        this.mapDragAndDropToTableModels(result);
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

  checkboxLabel(row?: DragAndDropTableModel): string {
    if (!row) {
      return `${ this.isAllSelected() ? 'deselect' : 'select' } all`;
    }
    return `${ this.selection.isSelected(row) ? 'deselect' : 'select' } row ${ row.index + 1 }`;
  }

  isAllSelected() {
    return this.selection.selected.length === this.dragAndDropQuestions.data.length;
  }

  private mapDragAndDropToTableModels(questions: DragAndDropQuestionResponse[]) {
    this.dragAndDropQuestions.data = questions.map((question, index) => {
      return {
        index: index + 1,
        name: question.question.name,
        text: question.question.question,
        date: question.creationDate,
        optionCount: question.question.optionCost.length,
      } as DragAndDropTableModel;
    });
  }
}

export interface DragAndDropTableModel {
  index: number;
  name: string;
  text: string;
  date: string;
  optionCount: number;
}
