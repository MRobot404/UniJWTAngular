import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {NavbarComponent} from "./navbar/navbar.component";


const routes: Routes = [
    { path: '', component: LoginComponent },
    {path: 'dashboard', component:DashboardComponent},
    {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
