import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private URL = 'http://localhost:8585/noauth/usuarios/login';

  constructor(private http: HttpClient) {}

  login(user:any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(this.URL, user, httpOptions)
      .pipe(catchError((e) => 'E'));
  }
}
