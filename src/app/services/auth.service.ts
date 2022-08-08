import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

import jwtDecode, { JwtPayload } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() UserLoginChanged = new EventEmitter<boolean>();
  @Output() UserDeleted = new EventEmitter<number>();

  constructor(private router: Router, private http: HttpClient) { }

  private GenerateAuthHeader() {
    let token = localStorage.getItem('authtoken')
    if (token == null) {
      alert('You are not logged in!');
      this.router.navigate(['/login']);
    }
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token as string}`);
    return headers;
  }

  Login(incomingUser: string, incomingPwd: string) {
    return this.http.get(`${environment.baseAPIURL}/users/${incomingUser}/${incomingPwd}`);
  }

  Logout() {
    localStorage.removeItem('authtoken');
    // localStorage.removeItem('userId');
    this.UserLoginChanged.emit(false);
    this.router.navigate(['/login']);
  }

  SetUserLoggedOn(token: string) {
    // console.log("SetUserLoggedOn");
    localStorage.setItem('authtoken', token);
    this.UserLoginChanged.emit(true);
    this.router.navigate(['/']);
  }

  GetCurrentUser() {
    const tokenString = localStorage.getItem('authtoken');
    if (!tokenString) {
      return null;
    }
    const token = <any>jwtDecode(tokenString!);
    console.log(token);
    return token;
  }

  GetCurrentUserData(userId: string) {
    let headers: HttpHeaders = this.GenerateAuthHeader();
    return this.http.get(`${environment.baseAPIURL}/users${userId}`, { headers: this.GenerateAuthHeader() });
  }

  AddUser(newUser: User) {
    return this.http.post<User>(`${environment.baseAPIURL}/users`, newUser, { headers: this.GenerateAuthHeader() });
  }

  EditUser(editedUser: any) {
    return this.http.patch(`${environment.baseAPIURL}/users`, editedUser, { headers: this.GenerateAuthHeader() });
  }

  GetUsers() {
    return this.http.get(`${environment.baseAPIURL}/users`);
  }

  DeleteUser(user: User) {
    return this.http.delete(`${environment.baseAPIURL}/users/${user.userId}`, { headers: this.GenerateAuthHeader() });
  }
}
