import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: any = {};
  errorInicio: boolean = false;
  ngOnInit(): void {}

  constructor(private loginServices: LoginService) {}

  login() {
    let formulario: any = document.getElementById('login');
    let formularioValido: boolean = formulario.reportValidity();
    this.errorInicio = false;
    if (formularioValido) {
      this.loginServices
        .login(this.usuario)
        .subscribe((response: any) => this.loginProcess(response));
    }
  }

  loginProcess(user: any) {
    if (user.token) {
      localStorage.setItem("usuario", JSON.stringify(user));
      location.href="/dashboard"
    } else {
      this.errorInicio = true;
    }
  }
}
