import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormManageResponse } from '../../../spec/defs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MoneySandboxService } from '../../../services/money-sandbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'mr-app-pages-admin-forms',
  templateUrl: 'app-pages-admin-forms.component.html',
  styleUrls: [ './app-pages-admin-forms.component.scss' ],
})
export class AppPagesAdminFormsComponent implements OnInit, AfterViewInit {

  pending = true;
  iconAction = false;
  formLinks: string[] = [];

  columns = [ 'index', 'creatorLogin', 'firstName', 'lastName', 'name', 'answerTime',
    'creationDate', 'numberOfQuestions', 'numberOfAnswers', 'isPublic', 'delete' ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  forms = new MatTableDataSource<FormManageTableModel>();
  responseForms: FormManageResponse[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private dialog: MatDialog,
              private httpService: MoneySandboxService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getManageForms();
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

  private mapFormResponseToFormTableModel(forms: FormManageResponse[]) {
    this.responseForms = forms;
    this.forms.data = forms.map((form, index) => {
      return {
        index: index + 1,
        login: form.login ? form.login : 'Brak',
        firstName: form.firstName ? form.firstName : 'Brak',
        lastName: form.lastName ? form.lastName : 'Brak',
        name: form.name,
        answerTime: form.answerTime,
        creationDate: form.creationDate,
        numberOfQuestions: form.numberOfQuestions,
        numberOfAnswers: form.numberOfAnswers,
        isPublic: form.isPublic ? 'Tak' : 'Nie',
      } as FormManageTableModel;
    });
  }

  private getManageForms() {
    this.httpService.getManageForms().subscribe(forms => {
      this.pending = false;
      if (forms && forms.length) {
        this.mapFormResponseToFormTableModel(forms);
      } else {
        this.forms.data = [];
        this.responseForms = [];
        this.formLinks = [];
        this._snackBar.open('Brak arkuszy w serwisie', '', { duration: 1000 });
      }
    }, () => {
      this.pending = false;
      this._snackBar.open('Nie można pobrać danych', '', { duration: 1000 });
    });
  }

  redirectToUsers() {
    this.router.navigateByUrl('/admin/users').then();
  }

  delete(index: number) {
    this.httpService.adminDeleteForm(this.responseForms[index - 1].formId).subscribe(response => {
      if (response.status < 205) {
        this._snackBar.open('Usuwanie pomyślne', 'Ok', { duration: 2500 });
        this.getManageForms();
      } else {
        this._snackBar.open('Błąd', 'Ok', { duration: 2500 });
      }
    }, () => {
      this._snackBar.open('Błąd', 'Ok', { duration: 2500 });
    });
  }
}

export interface FormManageTableModel {
  index: number;
  login: string;
  firstName: string;
  lastName: string;
  name: string;
  answerTime: number;
  creationDate: string;
  numberOfQuestions: number;
  numberOfAnswers: number;
  isPublic: string;
}
