import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-carga-cliente',
  templateUrl: './carga-cliente.component.html',
  styleUrls: ['./carga-cliente.component.css'],
  providers: [MessageService]
})
export class CargaClienteComponent implements OnInit {
  tabla:boolean=false;
  convertedJson!: string;
  clientes: any = [];
  form:boolean=false;

  constructor(private messageService: MessageService) { }

  showSuccessDocument() {
    this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Su documento es correcto' });
  }
  showErrorDocument() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El documento no es correcto' });
  }


  ngOnInit() {
    this.form=true;
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
          console.log(data);
          this.convertedJson = JSON.stringify(data, undefined, 4);
          this.clientes = JSON.parse(this.convertedJson);
          this.showSuccessDocument()
          this.form=false;
          this.tabla=true;
        })
        console.log(workbook)
      }
    } else {
      this.showErrorDocument()
    }
  }

}
