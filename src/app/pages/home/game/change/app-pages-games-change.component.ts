import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppPagesGamesMoneyDialogComponent } from '../game-over-dialog/app-pages-games-money-dialog.component';


@Component({
  selector: 'mr-app-pages-games-change-component',
  templateUrl: 'app-pages-games-change.component.html',
  styleUrls: [ 'app-pages-games-change.component.scss' ]
})
export class AppPagesGamesChangeComponent implements OnInit, OnChanges {
  @Input()
  difficulty: string;

  @Input()
  insideGame: boolean;

  @Output()
  gameEnded: EventEmitter<boolean> = new EventEmitter<boolean>();

  annieDialog: string;
  headerDialog: string;

  pathPrefix = './../../../../../assets/money/';
  answers: {path: string, value: number}[] = [];

  items: {path: string, value: number}[] = [];
  payedValue = 0;
  toPay = 0;
  change = 0;
  firstPayment = true;

  constructor(public dialog: MatDialog) {
    this.loadCoinsAndBills();
  }

  ngOnInit() {
    this.headerDialog = 'Przeciągaj banknoty i monety aby zapłacić za zakupy. Pamiętaj, żeby użyć jednego banknotu lub jednej monety!';
    this.annieDialog = ('Hmm... za Twoje zakupy poproszę ' + this.setBalance() + ' zł.');
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
      if (this.firstPayment) {
        if (this.toPay > event.item.data.value) {
          this.openDialog('Oj... To wygląda na pomyłkę.');
        } else {
          this.payedValue = event.item.data.value;
          this.change = event.item.data.value - this.toPay;
          if (this.change === 0) {
            this.openDialog('Brawo! Udało Ci się zrobić zakupy!');
          } else {
            this.firstPayment = false;
            this.annieDialog = 'Dziękuję to na pewno wystarczy.';
            setTimeout(() => {
              this.resetAnnieBalanceDialog();
            }, 1000);
            this.headerDialog = 'Ile reszty powinna dać Ci Ania? Przeciągnij banknoty lub monety.';
          }
        }
      } else {
        this.change = this.change - event.item.data.value;
        if (this.change < 0) {
          this.openDialog('Oj... To wygląda na pomyłkę.');
        } else {
          if (this.change === 0) {
            this.openDialog('Brawo! Udało Ci się zrobić zakupy!');
          } else {
            this.annieDialog = 'Dziękuję, ale to chyba nie wszystko?';
            setTimeout(() => {
              this.resetAnnieBalanceDialog();
            }, 1500);
          }
        }
      }
    }
  }

  private resetAnnieBalanceDialog() {
    this.annieDialog = 'Hmm... powiesz mi ile reszty powinnam wydać, jeśli Twoje zakupy kosztowały '
      + this.toPay + ', a Ja otrzymałam '
      + this.payedValue + ' zł od Ciebie?';
  }

  private setBalance(): number {
    let money = 0;
    switch (this.difficulty) {
      case 'Łatwy':
        while (!this.validRandomValue(money)) {
          money = Math.floor(Math.random() * 9);
        }
        break;
      case 'Średni':
        while (money < 10 && !this.validRandomValue(money)) {
          money = Math.floor(Math.random() * 99);
        }
        break;
      case 'Trudny':
        while (money < 100 && !this.validRandomValue(money)) {
          money = Math.floor(Math.random() * 499);
        }
        break;
      default:
        money = Math.floor(Math.random() * 99);
    }
    this.toPay = money;
    return money;
  }

  private openDialog(message: string) {
    if (this.insideGame) {
      const dialogRef = this.dialog.open(AppPagesGamesMoneyDialogComponent, {
        width: '500px',
        height: '200px',
        data: message,
      });
      dialogRef.afterClosed().subscribe(() => {
        dialogRef.close();
      });
    } else {
      this.gameEnded.emit(true);
    }
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
  }

  private validRandomValue(money: number): boolean {
    return money !== 500 && money !== 200 && money !== 100 && money !== 50
      && money !== 20 && money !== 10 && money !== 5 && money !== 2 && money !== 1 && money !== 0;
  }
}
