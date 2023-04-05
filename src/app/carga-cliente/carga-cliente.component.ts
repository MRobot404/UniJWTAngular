import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Clientes } from '../domain/clientes';
import { ClienteserviceService } from '../Services/clienteservice.service';
@Component({
  selector: 'app-carga-cliente',
  templateUrl: './carga-cliente.component.html',
  styleUrls: ['./carga-cliente.component.css'],
  providers: [MessageService]
})
export class CargaClienteComponent implements OnInit {
  loading: boolean = false;
  tabla: boolean = false;
  convertedJson!: string;
  clientes: any = [];
  form: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  dt1: any = Table;
  clonedClientes: { [s: string]: Clientes } = {};

  constructor(private messageService: MessageService, private clientesService: ClienteserviceService) { }
  ngOnInit() {
    this.form = true;
  }

  clear(table: Table) {
    table.clear();
  }
  onSearchInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value;
    this.dt1.filterGlobal(searchText, 'contains');
  }

  onPageChange(event: any) {
    let pagina: number = event.first / this.sizePage;
    console.log(pagina)
    this.actualizarPagina(pagina, this.sizePage);
    let sizeTmp: number = event.rows;
    this.sizePage = sizeTmp;
    this.actualizarPagina(pagina, this.sizePage);
  }

  actualizarPagina(page: number, size: number) {
    this.totalElements = this.clientes.length;
  }

  onRowEditInit(cliente: Clientes) {
    if (cliente.dpiCliente !== undefined) {
      this.clonedClientes[cliente.dpiCliente] = { ...cliente };
    }
  }

  onRowEditSave(cliente: Clientes) {
    if (cliente.dpiCliente !== undefined) {
      delete this.clonedClientes[cliente.dpiCliente];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cliente guardado' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cliente no guardado' });
    }
  }

  onRowEditCancel(cliente: Clientes, index: number) {
    if (cliente.dpiCliente !== undefined) {
      this.clientes[index] = this.clonedClientes[cliente.dpiCliente];
      delete this.clonedClientes[cliente.dpiCliente];
    }
  }

  guardar() {
    this.loading = true;
    this.clientes.forEach((cliente: any) => {
      let clientetemp = JSON.stringify(cliente);
      console.log(clientetemp)
      this.clientesService.guardarCliente(clientetemp).subscribe(
        (response: any) => {
          setTimeout(() => { 
            this.showSuccessClientes()
            this.loading = false;
            this.form = true;
            this.tabla = false;
            this.clientes=[];
          }, 500);  
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    });
  }
  
  


  showSuccessClientes() {
    this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Sus clientes fueron guardados' });
  }

  showSuccessDocument() {
    this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Su documento es correcto' });
  }
  showErrorDocument() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El documento no es correcto' });
  }

  fileUpload(event: any) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    if (selectedFile.name.endsWith('.xls') || selectedFile.name.endsWith('.xlsx')) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event) => {
        console.log(event);
        let binaryData = event.target?.result;
        let workbook = XLSX.read(binaryData, { type: 'binary' });
        workbook.SheetNames.forEach(sheet => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          this.convertedJson = JSON.stringify(data, undefined, 4);
          this.clientes = JSON.parse(this.convertedJson);
          console.log(this.clientes);
          this.showSuccessDocument()
          this.form = false;
          this.tabla = true;
          this.totalElements = this.clientes.length;
        })
        console.log(workbook)
      }
    } else {
      this.showErrorDocument()
    }
  }

}
