import { Injectable } from '@angular/core';
import { RoleService } from './role.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LogoutService {

  constructor(private roleService: RoleService, private router: Router, private _snackBar: MatSnackBar) {
  }

  logout() {
    this.roleService.setRole('');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(null);
    window.location.reload();
  }
}
