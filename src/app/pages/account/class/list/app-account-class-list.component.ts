import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SingleChoiceTableModel} from '../../creator/show-questions/single-choice/app-show-single-choice.component';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'mr-app-account-class-list',
  templateUrl: 'app-account-class-list.component.html',
  styleUrls: ['app-account-class-list.component.scss'],
})
export class AppAccountClassListComponent {

  classes = new MatTableDataSource<SingleChoiceTableModel>();
  pagedClasses = new MatTableDataSource<SingleChoiceTableModel>();

  columns = ['index', 'name', 'students', 'creationDate', 'modificationDate', 'formsActive', 'formsProcessed'];

  pageSize = 5;
  currentPage = 1;

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
