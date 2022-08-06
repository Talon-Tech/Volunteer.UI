import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NewuserComponent } from './views/newuser/newuser.component';
import { UsersComponent } from './views/users/users.component';
import  { OpportunitiesComponent } from "./views/opportunities/opportunities.component"
import { RguardService } from './services/rguard.service';
import { EditUserComponent } from './views/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [RguardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'newuser',
    component: NewuserComponent
  }, 
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RguardService]
  },
  {
    path: 'edituser',
    component: EditUserComponent,
    canActivate: [RguardService]
  },
  {
    path: 'opportunities',
    component: OpportunitiesComponent,
    canActivate: [RguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
