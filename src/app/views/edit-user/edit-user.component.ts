import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  isVolunteer: boolean = false;
  isAdmin: boolean = false;

  editedUser: User | null = null;

  error = false;
  errorMsg = '';

  roles: Array<string> | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService,
    private router: Router
  ) { 
    let token = this.authSvc.GetCurrentUser();
    if (!token) {
      this.editedUser = null;
      this.roles = null;
    } else {
      this.editedUser = token.UserData;
      this.roles = token.Roles;
      this.isAdmin = token.Roles.includes("Admin") ? true: false;
      this.isVolunteer = token.Roles.includes("Volunteer") ? true: false;
    }
  }

  userId: number | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p) => {
      this.userId = p['userId'];
    });
  }

  EditUser() {
    // if (this.newUser?.userId == null || this.newUser?.firstName == '' || this.newUser?.lastName == '' || this.newUser?.email == '' || this.newUser?.password == '') {
    if (this.editedUser?.firstName == '' || this.editedUser?.lastName == '' || this.editedUser?.email == '' || this.editedUser?.password == '') {
      this.error = true;
      this.errorMsg = "Please complete the required information";
    } else {
      // console.log("Test");
      // console.log(this.newUser);
      if (this.editedUser) {
        this.authSvc.EditUser({
          UserData: this.editedUser,
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
