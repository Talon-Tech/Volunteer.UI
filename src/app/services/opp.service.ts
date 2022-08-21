import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Opportunity } from '../models/opportunity.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OppService {

  constructor(private router: Router, private http: HttpClient, private authSvc: AuthService) { }

  GetOpportunities() {
    return this.http.get(`${environment.baseAPIURL}/opportunities`);
  }

  GetCurrentOpp(oppId: any) {
    return this.http.get(`${environment.baseAPIURL}/opportunities/${oppId}`);
  //   // return localStorage.getItem('authtoken');

  //   const tokenString = localStorage.getItem('authtoken');
  //   if (!tokenString) {
  //     return null;
  //   }
  //   const token = <any>jwtDecode(tokenString!);
  //   console.log(token);
  //   return token;
  }

  DeleteOpportunity(opp: Opportunity) {
    return this.http.delete(`${environment.baseAPIURL}/opportunities/${opp.id}`, { headers: this.authSvc.GenerateAuthHeader() });
  }

  EditOpportunity(editedOpp: Opportunity) {
    return this.http.patch(`${environment.baseAPIURL}/opportunities`, editedOpp, { headers: this.authSvc.GenerateAuthHeader() });
  }

  AddOpportunity(newOpp: Opportunity) {
    return this.http.post(`${environment.baseAPIURL}/opportunities`, newOpp, { headers: this.authSvc.GenerateAuthHeader() });
  }
}
