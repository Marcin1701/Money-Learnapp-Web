import {Injectable} from '@angular/core';
import {RoleService} from './role.service';
import {Router} from '@angular/router';

@Injectable()
export class LogoutService {

  constructor(private roleService: RoleService, private router: Router) {
  }

  logout() {
    this.roleService.setRole('');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(null);
  }
}
