import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() currentUser: User | null = null;
  @Output() DeletePost = new EventEmitter<number>();

  user: User | null = null;
  userArray: any = [];
  // currentUser: string | null;
  userId: string | null | undefined;
  error = false;
  errorMsg = '';

  constructor(private authSvc: AuthService, private router: Router) {
    // this.currentUser = this.authSvc.GetUsers();
  }

  ngOnInit(): void {
    this.authSvc.GetUsers().subscribe(response => {
      this.userArray = response as [];
    })
  }

  Delete(user: User) {
    var del = confirm(`Are you sure you want to delete this account, "${this.user?.firstName} ${this.user?.lastName}"?`);
    if (del) {
      this.authSvc.DeleteUser(user as User).subscribe({
        next: (r) => this.router.navigate(['/']),
        error: (e) => { this.error = true, this.errorMsg = e.error.message }
      });
    }
  }

  Edit(userId: number) {
   this.router.navigate(['/edituser']); 
  }

}
