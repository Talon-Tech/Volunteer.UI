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

  newUser: User | null = null;
  error = false;
  errorMsg = '';

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.newUser = new User();
  }

  AddUser() {
    // if (this.newUser?.userId == null || this.newUser?.firstName == '' || this.newUser?.lastName == '' || this.newUser?.email == '' || this.newUser?.password == '') {
    if (this.newUser?.firstName == '' || this.newUser?.lastName == '' || this.newUser?.email == '' || this.newUser?.password == '') {
      this.error = true;
      this.errorMsg = "Please complete the required information";
    } else {
      // console.log("Test");
      // console.log(this.newUser);
      this.authSvc.AddUser(this.newUser as User).subscribe({
        next: (r) => this.router.navigate(['/login']),
        error: (e) => { this.error = true, this.errorMsg = e.error.message }
      });
    }
  }

}
