import { Component, Input } from '@angular/core';
import { LogoutService } from '../../../services/logout.service';
import { RoleService } from '../../../services/role.service';
import { MoneySandboxService } from '../../../services/money-sandbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mr-app-pages-home-menu',
  templateUrl: 'app-pages-home-menu.component.html',
  styleUrls: [ 'app-pages-home-menu.component.scss' ]
})
export class AppPagesHomeMenuComponent {


  @Input()
  isLoggedIn: boolean;

  isAdmin: boolean;

  pendingReport = false;

  constructor(public logoutService: LogoutService,
              private roleService: RoleService,
              private httpService: MoneySandboxService,
              private _matSnackBar: MatSnackBar) {
    this.httpService.getAccountRole().subscribe(role => this.isAdmin = role.role === 'ADMIN');
  }

  generateReport() {
    this.pendingReport = true;
    this.httpService.getPdfReport().subscribe((response: Blob) => {
      const file = new Blob([ response ], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pendingReport = false;
      window.open(fileURL, '_blank');
    }, () => {
      this._matSnackBar.open('Wystąpił błąd', 'Ok', { duration: 1000 });
    });
  }
}
