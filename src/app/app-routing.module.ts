import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ActualizarClienteComponent } from './actualizar-cliente/actualizar-cliente.component';
import { GuardGuard } from './guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clientes', component: ClientesComponent, canActivate: [GuardGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'actualizarCliente',
    component: ActualizarClienteComponent,
    canActivate: [GuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
