import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  usuario: any;

  ngOnInit(): void {
    let temp: any = localStorage.getItem('usuario');
    if (temp) {
      this.usuario = JSON.parse(temp);
    } else {
    }
  }
  logout() {
    localStorage.clear();
    location.href = '';
  }
}
