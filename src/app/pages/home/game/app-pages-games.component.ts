import { Component, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'mr-app-pages-games-component',
  templateUrl: 'app-pages-games.component.html',
  styleUrls: [ 'app-pages-games.component.scss' ]
})
export class AppPagesGamesComponent {
  @Input()
  insideGame: boolean;

  difficulties = ['Łatwy', 'Średni', 'Trudny'];
  games = ['Skarb Stefana', 'Zakupy u Ani'];
  gameDifficulty: string;
  game: string;
  link = '';
  inGame = false;

  isInvalid(): boolean {
    return !(this.gameDifficulty?.length && this.game?.length);
  }

  toggleSelection() {
    this.inGame = true;
    this.insideGame = true;
  }

  gameEnded() {
    this.inGame = false;
  }
}
