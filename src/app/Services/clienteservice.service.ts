import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClienteserviceService {
  private readonly URL = '/auth/clientes/';

  constructor(private http: HttpClient) {}
  buscarClientes(): Observable<any> {
    return this.http
      .get<any>(this.URL + 'buscar')
      .pipe(catchError((e) => 'e '));
  }

  eliminarClientes(id: any): Observable<any> {
    return this.http
      .delete<any>(this.URL + 'eliminar/' +id)
      .pipe(catchError((e) => 'Error'));
  }
}
