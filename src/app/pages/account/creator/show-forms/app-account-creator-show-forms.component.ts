import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MoneySandboxService} from '../../../../services/money-sandbox.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {FormResponse} from '../../../../spec/defs';
import {AppAccountCreatorFormDetailsComponent} from './form-details/app-account-creator-form-details.component';

@Component({
  selector: 'mr-account-creator-new-question-component',
  templateUrl: 'app-account-creator-show-forms.component.html',
  styleUrls: ['app-account-creator-show-forms.component.scss'],
})
export class AppAccountCreatorShowFormsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  forms = new MatTableDataSource<FormTableModel>();
  responseForms: FormResponse[] = [];

  pageSize = 8;
  columns = ['index', 'name', 'answerTime', 'creationDate', 'numberOfQuestions', 'numberOfAnswers', 'isPublic'];
  pending = true;

  constructor(private httpService: MoneySandboxService,
              private _liveAnnouncer: LiveAnnouncer,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.httpService.getForms().subscribe(forms => {
      this.pending = false;
      forms && forms.length ?
        this.mapStudentResponseToStudentTableModel(forms) :
        this._snackBar.open('Nie posiadasz żadnych arkuszy', '', { duration: 1000 });
    });
  }

  ngAfterViewInit(): void {
    this.forms.paginator = this.paginator;
    this.forms.sort = this.sort;
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`).then(null);
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(null);
    }
  }

  private mapStudentResponseToStudentTableModel(forms: FormResponse[]) {
    this.responseForms = forms;
    this.forms.data = forms.map((form, index) => {
      return {
        index: index,
        name: form.name,
        answerTime: form.answerTime,
        creationDate: form.creationDate,
        numberOfQuestions: form.questions,
        numberOfAnswers: form.answers,
        isPublic: form.isPublic ? 'Tak' : 'Nie',
      } as FormTableModel;
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.forms.filter = filterValue.trim().toLowerCase();
  }

  selectForm(form: FormTableModel) {
    const dialogRef = this.dialog.open(AppAccountCreatorFormDetailsComponent, {
      width: '800px',
      height: '600px',
      data: this.responseForms[form.index - 1],
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.forms.data.map(formData => {
          if (formData.index === data.index) {
            return data;
          }
          console.log(data);
        });
      }
      dialogRef.close();
    });
  }
}

export interface FormTableModel {
  index: number;
  name: string;
  answerTime: number;
  creationDate: string;
  numberOfQuestions: number;
  numberOfAnswers: number;
  isPublic: string;
}
