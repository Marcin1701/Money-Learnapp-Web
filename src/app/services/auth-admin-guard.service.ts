import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {RoleService} from './role.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuardService implements CanActivate {

  constructor(private roleService: RoleService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.roleService.role === 'ADMIN';
  }
}
