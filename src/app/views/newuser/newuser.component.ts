import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  isVolunteer: boolean = false;
  isAdmin: boolean = false;

  roles: Array<string> | null;

  newUser: User | null = null;

  error = false;
  errorMsg = '';

  constructor(private authSvc: AuthService, private router: Router) {

    let token = this.authSvc.GetCurrentUser();
    if (!token) {
      this.newUser = null;
      this.roles = null;
    } else {
      this.newUser = token.UserData;
      this.roles = token.Roles;
      this.isAdmin = token.Roles.includes("Admin") ? true: false;
      this.isVolunteer = token.Roles.includes("Volunteer") ? true: false;
    }
    
  }

  ngOnInit(): void {
    this.newUser = new User();
  }

  AddUser() {
    if (this.newUser?.firstName == '' || this.newUser?.lastName == '' || this.newUser?.email == '' || this.newUser?.password == '') {
      this.error = true;
      this.errorMsg = "Please complete the required information";
    } else {
      if (this.newUser) {
        this.authSvc.AddUser({
          UserData: this.newUser,
          Roles: this.roles
        }).subscribe({
          next: (r) => this.router.navigate(['/users']),
          error: (e) => { this.error = true, this.errorMsg = e.error.message }
        });
      }
    }
  }

  setIsVolunteer(flag: boolean) {
    this.isVolunteer = !flag;
  }
  setIsAdmin(flag: boolean) {
    this.isAdmin = !flag;
  }

}
