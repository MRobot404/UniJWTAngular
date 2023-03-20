import { Component, OnInit } from '@angular/core';
import { ClienteserviceService } from '../Services/clienteservice.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: any = [];
  cargar: boolean = false;
  ngOnInit(): void {
    this.buscarClientes();
  }
  constructor(private clientesService: ClienteserviceService) {}

  buscarClientes() {
    this.cargar = true;
    this.clientesService
      .buscarClientes()
      .subscribe((data: any) => this.mostrarClientes(data));
  }

  mostrarClientes(response: any) {
    this.cargar = false;
    this.clientes = response;
    console.log(this.clientes);
  }

  eliminar(cliente: any) {
    console.log(cliente);
    this.cargar = true;
    this.clientesService.eliminarClientes(cliente.dpiCliente).subscribe(
      (response: any) => {
        console.log(response);
        this.buscarClientes();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  actualizar(cliente:any){
    localStorage.setItem("temp", JSON.stringify(cliente));

  }
}
