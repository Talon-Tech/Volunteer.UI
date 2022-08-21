import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Opportunity } from '../../models/opportunity.model';
import { OppService } from '../../services/opp.service';

@Component({
  selector: 'app-edit-opportunity',
  templateUrl: './edit-opportunity.component.html',
  styleUrls: ['./edit-opportunity.component.css']
})
export class EditOpportunityComponent implements OnInit {

  editedOpp: Opportunity | null = null;
  currentOpp: Opportunity = new Opportunity; 
  oppId: number | null | undefined; 

  error = false;
  errorMsg = '';

  constructor(private activatedRoute: ActivatedRoute, private oppSvc: OppService, private router: Router) {
    this.activatedRoute.params.subscribe((p)=>{
      console.log(p);
      this.oppId = p['oppId']; 
      console.log(p['oppId']);
    });

    this.oppSvc.GetCurrentOpp(this.oppId).subscribe({
      next: (r) => this.currentOpp = r as Opportunity,
      error: (e) => {this.error=true, this.errorMsg=e.error.message}
    }); 
    
    
    
    // let currentOpp = this.oppSvc.GetCurrentOpp(); 


    // let token = this.oppSvc.GetCurrentOpp();
    // if (!token) {
    //   this.editedOpp = null;
    //   this.roles = null;
    // } else {
    //   this.editedUser = token.UserData;
    //   this.roles = token.Roles;
    //   this.isAdmin = token.Roles.includes("Admin") ? true : false;
    //   this.isVolunteer = token.Roles.includes("Volunteer") ? true : false;
    // }
  }

  ngOnInit(): void {

  }

  EditOpportunity() {
    console.log(this.currentOpp); 
    this.oppSvc.EditOpportunity(this.currentOpp).subscribe({
      next: (r) => this.router.navigate(['/']),
      error: (e) => {this.error=true, this.errorMsg=e.error.message}
    }); 

    // if (this.editedOpp) {
    //   this.oppSvc.EditOpportunity({
    //     OppData: this.editedOpp,
    //     // Roles: this.roles
    //   }).subscribe({
    //     next: (r) => this.router.navigate(['/users']),
    //     error: (e) => { this.error = true, this.errorMsg = e.error.message }
    //   });
    // }

  }

}
