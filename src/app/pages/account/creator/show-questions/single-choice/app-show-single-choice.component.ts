import {Component, OnInit} from '@angular/core';
import {MoneySandboxService} from '../../../../../services/money-sandbox.service';
import {Question} from '../../../../../spec/defs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'mr-app-show-single-choice-component',
  templateUrl: 'app-show-single-choice.component.html',
  styleUrls: ['app-show-single-choice.component.scss'],
})
export class AppShowSingleChoiceComponent implements OnInit {

  singleChoiceQuestions: SingleChoiceTableModel[] = [];

  columns = ['index', 'name', 'text', 'date', 'optionCount'];

  constructor(private httpService: MoneySandboxService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.httpService.loadSingleChoiceQuestions().subscribe(result => {
      if (result.length) {
        this.mapSingleChoiceToTableModels(result);
      }
    }, () => {
      this._snackBar.open('Nieoczekiwany błąd!', 'Ok', { duration: 2000 });
    });
  }

  private mapSingleChoiceToTableModels(questions: Question[]) {
    this.singleChoiceQuestions = questions.map((question, index) => {
      return {
        index: index,
        name: question.structure.name,
        text: question.structure.text,
        date: question.structure.creationDate,
        optionCount: question.structure.value.singleChoiceOptions.length,
      } as SingleChoiceTableModel;
    });
  }
}

export interface SingleChoiceTableModel {
  index: number;
  name: string;
  text: string;
  date: string;
  optionCount: number;
}
