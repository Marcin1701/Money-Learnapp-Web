import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormTableModel } from '../../account/creator/show-forms/app-account-creator-show-forms.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormResponse } from '../../../spec/defs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MoneySandboxService } from '../../../services/money-sandbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppPagesAdminPublicityPublishComponent } from './publish/app-pages-admin-publicity-publish.component';

@Component({
  selector: 'mr-app-pages-admin-publicity',
  templateUrl: 'app-pages-admin-publicity.component.html',
  styleUrls: [ './app-pages-admin-publicity.component.scss' ],
})
export class AppPagesAdminPublicityComponent implements OnInit, AfterViewInit {
  pending = true;
  iconAction = false;
  formLinks: string[] = [];

  columns = [ 'index', 'name', 'answerTime', 'creationDate', 'numberOfQuestions', 'numberOfAnswers', 'isPublic', 'solve' ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  forms = new MatTableDataSource<FormTableModel>();
  responseForms: FormResponse[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private dialog: MatDialog,
              private httpService: MoneySandboxService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getForms();
  }

  ngAfterViewInit(): void {
    this.forms.paginator = this.paginator;
    this.forms.sort = this.sort;
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

  selectForm(form: FormTableModel) {
    if (!this.iconAction) {
      const dialogRef = this.dialog.open(AppPagesAdminPublicityPublishComponent, {
        width: '380px',
        height: '150px',
        data: this.responseForms[form.index - 1],
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this.getForms();
        }
        dialogRef.close();
      });
    }
  }

  solve(index: number) {
    window.open(this.formLinks[index - 1], '_blank');
  }

  private createFormLinks() {
    this.responseForms.forEach(form => {
      this.formLinks.push(window.location.href.replace('/admin/publicity', '/answer?id=' + form.id));
    });
  }

  private mapFormResponseToFormTableModel(forms: FormResponse[]) {
    this.responseForms = forms;
    this.createFormLinks();
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
    this.httpService.getFormsWaitingForPublicity().subscribe(forms => {
      this.pending = false;
      if (forms && forms.length) {
        this.mapFormResponseToFormTableModel(forms);
      } else {
        this.forms.data = [];
        this.responseForms = [];
        this.formLinks = [];
        this._snackBar.open('Brak arkuszy oczekujących', '', { duration: 1000 });
      }
    }, () => {
      this.pending = false;
      this._snackBar.open('Nie można pobrać danych', '', { duration: 1000 });
    });
  }
}
