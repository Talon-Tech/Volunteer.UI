import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { LoginComponent } from './views/login/login.component';
import { NewuserComponent } from './views/newuser/newuser.component';
import { HomeComponent } from './views/home/home.component';
import { UsersComponent } from './views/users/users.component';
import { OpportunitiesComponent } from './views/opportunities/opportunities.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';
import { TableComponent } from './views/components/table/table.component';
import { EditOpportunityComponent } from './views/edit-opportunity/edit-opportunity.component';
import { NewOpportunityComponent } from './views/new-opportunity/new-opportunity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    NewuserComponent,
    HomeComponent,
    UsersComponent,
    OpportunitiesComponent,
    EditUserComponent,
    TableComponent,
    EditOpportunityComponent,
    NewOpportunityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
