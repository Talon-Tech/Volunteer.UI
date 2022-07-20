import jwtDecode from 'jwt-decode';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RguardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let loggedInUser = localStorage.getItem('authtoken');
    if (loggedInUser) {
      let token = <any>jwtDecode(loggedInUser);
      let expDate = new Date(token.exp * 1000);

      if (expDate < new Date()) {
        this.router.navigate(['/login']);
        return false;
      } else
        return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
