import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Opportunity } from '../../models/opportunity.model';
import { OppService } from '../../services/opp.service';

@Component({
  selector: 'app-new-opportunity',
  templateUrl: './new-opportunity.component.html',
  styleUrls: ['./new-opportunity.component.css']
})
export class NewOpportunityComponent implements OnInit {
  
  newOpp: Opportunity = new Opportunity; 
  error = false;
  errorMsg = '';

  constructor(private activatedRoute: ActivatedRoute, private oppSvc: OppService, private router: Router) { }

  ngOnInit(): void {
  }

  AddOpportunity() {
    this.oppSvc.AddOpportunity(this.newOpp).subscribe({
      next: (r) => this.router.navigate(['/opportunities']),
      error: (e) => { this.error = true, this.errorMsg = e.error.message }
    });
  }

}
