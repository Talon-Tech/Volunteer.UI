import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Opportunity } from '../../models/opportunity.model';
import { OppService } from '../../services/opp.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OpportunitiesComponent implements OnInit {
  opportunity: Opportunity | null = null;
  opportunityArray: any = [];
  oppId: string | null | undefined;
  error = false;
  errorMsg = '';

  constructor(private oppSvc: OppService, private router: Router) {
    // this.currentUser = this.authSvc.GetUsers();
  }

  ngOnInit(): void {
    this.oppSvc.GetOpportunities().subscribe(response => {
      this.opportunityArray = response as [];
      this.opportunityArray.sort((a: any, b: any) => (a.id > b.id) ? 1 : -1)
    })
  }

  Delete(opportunity: Opportunity) {
    var del = confirm(`Are you sure you want to delete this opportunity, "${this.opportunity?.name}"?`);
    if (del) {
      this.oppSvc.DeleteOpportunity(opportunity as Opportunity).subscribe({
        next: (r) => this.router.navigate(['/opportunities'])
          .then(() => {
            window.location.reload();
          }),
        error: (e) => { this.error = true, this.errorMsg = e.error.message }
      });
    }
  }

  Edit(oppId: number) {
    console.log(oppId);
    this.router.navigate([`/editopp/${oppId}`]);
  }

}
