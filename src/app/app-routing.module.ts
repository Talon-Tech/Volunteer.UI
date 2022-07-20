import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NewuserComponent } from './views/newuser/newuser.component';
import { UsersComponent } from './views/users/users.component';
import { RguardService } from './services/rguard.service';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
