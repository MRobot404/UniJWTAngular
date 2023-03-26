import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ActualizarClienteComponent } from './actualizar-cliente/actualizar-cliente.component';
import { CrearClientesComponent } from './crear-clientes/crear-clientes.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, NotfoundComponent, NavbarComponent, ClientesComponent, ActualizarClienteComponent, CrearClientesComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ButtonModule, TableModule, PaginatorModule,BrowserAnimationsModule,],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
