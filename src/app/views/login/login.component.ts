import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService, private activatedRoute: ActivatedRoute) { }

  username = '';
  password = '';
  error = false;
  errorMsg = '';
  badLoginError = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p) => {
      this.username = p['userId'];
    });
  }

  Login() {
    if (this.username && this.password) {
      this.authSvc.Login(this.username, this.password).subscribe({
        next: (r) => this.authSvc.SetUserLoggedOn(Object.values(r)[0]),
        error: (e) => { this.error = true, this.errorMsg = e.error.message }
      });
    } else {
      this.error = true;
      this.errorMsg = "Please complete the required information";
    }
  }
}
