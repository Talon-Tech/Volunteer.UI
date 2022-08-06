import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: string | null;
  roles: Array<string> | null;

  constructor(private authSvc: AuthService) {
    let token = this.authSvc.GetCurrentUser();
    if (!token) {
      this.currentUser = null;
      this.roles = null;
    } else {
      this.currentUser = token.UserData;
      this.roles = token.Roles;
    }
  }

  ngOnInit(): void {
    this.authSvc.UserLoginChanged.subscribe((status) => {
      let token = this.authSvc.GetCurrentUser();
      this.currentUser = token.UserData;
      this.roles = token.Roles;
    })
  }

  Logout() {
    this.currentUser = null;
    this.roles = null;
    this.authSvc.Logout();
  }
}
