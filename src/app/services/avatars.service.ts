import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AvatarsService {

  getRandomAvatarUrl(pathToAssets: string): string {
    return pathToAssets + '/128_' + this.getRandomValue(1, 17) + '.png';
  }

  private getRandomValue(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
