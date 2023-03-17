import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  usuario: any;

  ngOnInit(): void {
    let temp: any = localStorage.getItem('usuario');
    if (temp) {
      this.usuario = JSON.parse(temp);
    } else {
      this.logout();
    }
  }
  logout(){
    localStorage.clear();
    location.href="";
  }
}
