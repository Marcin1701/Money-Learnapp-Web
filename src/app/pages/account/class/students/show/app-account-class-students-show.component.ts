import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {StudentResponse} from '../../../../../spec/defs';
import {MoneySandboxService} from '../../../../../services/money-sandbox.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatDialog} from '@angular/material/dialog';
import {AppAccountClassStudentsShowDetailsComponent} from './details/app-account-class-students-show-details.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'mr-app-account-class-students-show',
  templateUrl: 'app-account-class-students-show.component.html',
  styleUrls: ['app-account-class-students-show.component.scss'],
})
export class AppAccountClassStudentsShowComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  students = new MatTableDataSource<StudentTableModel>();

  pageSize = 8;

  columns = [
    'index',
    'firstName',
    'lastName',
    'className',
    'login',
    'email',
    'creationDate',
    'isCreatorAllowed',
    'isTemporaryPasswordActive'
  ];

  constructor(private httpService: MoneySandboxService,
              private _liveAnnouncer: LiveAnnouncer,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.httpService.getAllTeacherStudents().subscribe(students => {
      this.mapStudentResponseToStudentTableModel(students);
    });
  }

  ngAfterViewInit(): void {
    this.students.paginator = this.paginator;
    this.students.sort = this.sort;
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`).then(null);
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(null);
    }
  }

  private mapStudentResponseToStudentTableModel(students: StudentResponse[]) {
    this.students.data = students.map((student, index) => {
      return {
        id: student.id,
        index: index + 1,
        firstName: student.firstName,
        lastName: student.lastName,
        className: student.className && student.className.length ? student.className : 'Brak',
        login: student.login,
        email: student.email && student.email.length ? student.email : 'Brak',
        creationDate: student.creationDate,
        isCreatorAllowed: student.isCreatorAllowed ? 'Zezwolono' : 'Zablokowany',
        isTemporaryPasswordActive: student.isTemporaryPasswordActive ? 'Tak' : 'Nie',
      } as StudentTableModel;
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.students.filter = filterValue.trim().toLowerCase();
  }

  selectStudent(student: StudentTableModel) {
    const dialogRef = this.dialog.open(AppAccountClassStudentsShowDetailsComponent, {
      width: '800px',
      height: '600px',
      data: student,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.students.data.map(studentData => {
          if (studentData.index === data.index) {
            return data;
          }
          console.log(data);
        });
        // TODO Edytowanie ucznia
      }
      dialogRef.close();
    });
  }
}

export interface StudentTableModel {
  id: string;
  index: number;
  firstName: string;
  lastName: string;
  className: string;
  login: string;
  email: string;
  creationDate: string;
  isCreatorAllowed: string;
  isTemporaryPasswordActive: string;
}
