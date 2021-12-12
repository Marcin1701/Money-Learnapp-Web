import {Injectable} from '@angular/core';


@Injectable()
export class RoleService {

  role = '';

  setRole(role: string) {
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}
