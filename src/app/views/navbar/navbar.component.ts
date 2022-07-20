import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: string | null;

  constructor(private authSvc: AuthService) {
    this.currentUser = this.authSvc.GetCurrentUser();
  }

  ngOnInit(): void {
    this.authSvc.UserLoginChanged.subscribe((status) => {
      this.currentUser = this.authSvc.GetCurrentUser();
    })
  }

  Logout() {
    this.authSvc.Logout();
  }
}
