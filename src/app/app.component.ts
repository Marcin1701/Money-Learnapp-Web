import {Component, OnInit} from '@angular/core';
import {StudentService} from "./services/student.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  students: any;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
   this.studentService.getStudents().subscribe(data => this.students = data);
  }
}
