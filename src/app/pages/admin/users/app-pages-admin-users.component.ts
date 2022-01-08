import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountResponse } from '../../../spec/defs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MoneySandboxService } from '../../../services/money-sandbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppPagesAdminPublicityPublishComponent } from '../publicity/publish/app-pages-admin-publicity-publish.component';
import { AppPagesAdminUsersDetailsComponent } from './details/app-pages-admin-users-details.component';
import { Router } from '@angular/router';


@Component({
  selector: 'mr-app-pages-admin-users',
  templateUrl: 'app-pages-admin-users.component.html',
  styleUrls: [ './app-pages-admin-users.component.scss' ],
})
export class AppPagesAdminUsersComponent implements OnInit, AfterViewInit {
  pending = true;
  iconAction = false;
  formLinks: string[] = [];

  columns = [ 'index', 'login', 'firstName', 'lastName', 'email', 'creationDate' ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users = new MatTableDataSource<AccountTableModel>();
  responseAccounts: AccountResponse[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private dialog: MatDialog,
              private httpService: MoneySandboxService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  ngAfterViewInit(): void {
    this.paginator.pageSize = 4;
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${ sortState.direction }ending`).then(null);
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(null);
    }
  }

  userDetails(user: AccountTableModel) {
    if (!this.iconAction) {
      const dialogRef = this.dialog.open(AppPagesAdminUsersDetailsComponent, {
        width: '850px',
        height: '600px',
        data: this.responseAccounts[user.index - 1],
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data === 'DELETE') {
          this.getAccounts();
        }
        dialogRef.close();
      });
    }
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  private mapFormResponseToFormTableModel(users: AccountResponse[]) {
    this.responseAccounts = users;
    this.users.data = users.map((user, index) => {
      return {
        index: index + 1,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        creationDate: user.creationDate
      } as AccountTableModel;
    });
  }

  private getAccounts() {
    this.httpService.getAccounts().subscribe(accounts => {
      this.pending = false;
      if (accounts && accounts.length) {
        this.mapFormResponseToFormTableModel(accounts);
      } else {
        this.users.data = [];
        this.responseAccounts = [];
        this.formLinks = [];
        this._snackBar.open('Brak arkuszy oczekujących', '', { duration: 1000 });
      }
    }, () => {
      this.pending = false;
      this._snackBar.open('Nie można pobrać danych', '', { duration: 1000 });
    });
  }

  redirectToForms() {
    this.router.navigateByUrl('/admin/forms').then();
  }
}

export interface AccountTableModel {
  index: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  creationDate: string;
}
