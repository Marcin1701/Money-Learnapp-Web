import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AppPagesGamesMoneyDialogComponent } from '../game-over-dialog/app-pages-games-money-dialog.component';


@Component({
  selector: 'mr-app-pages-games-money-component',
  templateUrl: './app-pages-games-money.component.html',
  styleUrls: [ './app-pages-games-money.component.scss' ]
})
export class AppPagesGamesMoneyComponent implements OnInit, OnChanges {
  @Input()
  difficulty: string;

  @Input()
  insideGame: boolean;

  @Output()
  gameEnded: EventEmitter<boolean> = new EventEmitter<boolean>();

  pathPrefix = './../../../../../assets/money/';
  items: {path: string, value: number}[] = [];
  answers: {path: string, value: number}[] = [];
  balance: number;
  currentBalance = 0;
  time = 0;
  interval: any;

  constructor(public dialog: MatDialog) {
    this.loadCoinsAndBills();
  }

  ngOnInit() {
    let money = 0;
    while (money < 100) {
      money = Math.floor(Math.random() * 1000);
    }
    const pennies = Math.floor(Math.random() * 100);
    this.balance = parseFloat(money + '.' + pennies);
    this.startTimer();
  }

  ngOnChanges(): void {
    if (!this.insideGame) {
      this.gameEnded.emit(true);
    }
  }

  drop(event: CdkDragDrop<{path: string; value: number}[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.balance = this.balance - event.item.data.value;
      this.balance = Math.round(this.balance * 100) / 100;
      if (this.balance < 0) {
        clearInterval(this.interval);
        this.openDialog('Nie udało się! Spróbuj jeszcze raz.');
      }
      if (this.balance === 0) {
        clearInterval(this.interval);
        this.openDialog('Brawo! Czy chcesz spróbować jeszcze raz?');
      }
    }
  }

  private startTimer() {
    switch (this.difficulty) {
      case 'Łatwy':
        this.time = 60;
        break;
      case 'Średni':
        this.time = 30;
        break;
      case 'Trudny':
        this.time = 10;
        break;
      default:
        this.time = 30;
    }
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time = this.time - 1;
      }
      if (this.time === 0) {
        this.openDialog('Skończył się czas! Spróbuj jeszcze raz.');
        clearInterval(this.interval);
      }
    }, 1000);
  }

  private loadCoinsAndBills() {
    this.items.push({ path: this.pathPrefix + 'B_500' + '.png', value: 500 });
    this.items.push({ path: this.pathPrefix + 'B_200' + '.png', value: 200 });
    this.items.push({ path: this.pathPrefix + 'B_100' + '.png', value: 100 });
    this.items.push({ path: this.pathPrefix + 'B_50' + '.png', value: 50 });
    this.items.push({ path: this.pathPrefix + 'B_20' + '.png', value: 20 });
    this.items.push({ path: this.pathPrefix + 'B_10' + '.png', value: 10 });
    this.items.push({ path: this.pathPrefix + 'M_500' + '.png', value: 5 });
    this.items.push({ path: this.pathPrefix + 'M_200' + '.png', value: 2 });
    this.items.push({ path: this.pathPrefix + 'M_100' + '.png', value: 1 });
    this.items.push({ path: this.pathPrefix + 'M_50' + '.png', value: 0.5 });
    this.items.push({ path: this.pathPrefix + 'M_20' + '.png', value: 0.2 });
    this.items.push({ path: this.pathPrefix + 'M_10' + '.png', value: 0.1 });
    this.items.push({ path: this.pathPrefix + 'M_5' + '.png', value: 0.05 });
    this.items.push({ path: this.pathPrefix + 'M_2' + '.png', value: 0.02 });
    this.items.push({ path: this.pathPrefix + 'M_1' + '.png', value: 0.01 });
  }

  private openDialog(message: string) {
    if (this.insideGame) {
      const dialogRef = this.dialog.open(AppPagesGamesMoneyDialogComponent, {
        width: '450px',
        height: '135px',
        data: message,
      });
      dialogRef.afterClosed().subscribe(() => {
        dialogRef.close();
      });
    } else {
      this.gameEnded.emit(true);
    }
  }
}
