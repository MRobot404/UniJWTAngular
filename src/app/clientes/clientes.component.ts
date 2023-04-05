import { Component, OnInit } from '@angular/core';
import { ClienteserviceService } from '../Services/clienteservice.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  listClientes: any = [];
  clientes: any = [];
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  ngOnInit(): void {
    this.actualizarPagina(this.tempPage, this.sizePage);
  }


  constructor(private clientesService: ClienteserviceService) { }


  onPageChange(event: any) {
    let pagina:number = event.first/this.sizePage
    this.actualizarPagina(pagina, this.sizePage);
    let sizeTmp:number = event.rows
    this.sizePage=sizeTmp;
    this.actualizarPagina(pagina, this.sizePage);
  }

  actualizarPagina(page: number, size: number) {
    this.clientesService.verTodosPaginado(page, size).subscribe(
      res => {
        this.listClientes = res;
        this.clientes = this.listClientes.content;
        this.totalElements = this.listClientes.totalElements;
        this.totalPages = this.listClientes.totalPages;
      },
      err => console.log(err)
    );
  }


  eliminar(cliente: any) {
    console.log(cliente);
    this.cargar = true;
    this.clientesService.eliminarClientes(cliente.dpiCliente).subscribe(
      (response: any) => {
        console.log(response);
        this.actualizarPagina(this.tempPage, this.sizePage);
        this.cargar = false;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  actualizar(cliente: any) {
    localStorage.setItem("temp", JSON.stringify(cliente));
    location.href = "/actualizarCliente";
  }
}
