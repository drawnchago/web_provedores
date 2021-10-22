import { Component, OnInit, Inject, Optional  , ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdmonCatalogsService } from '../admon-catalogs.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CustomersDialogComponent } from './customers-dialog/customers-dialog.component';
import { CreatePdfComponent } from '../../../../shared/components/create-pdf/create-pdf.component';
import { Customers } from './customers.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import  jsPDF  from "jspdf";
import 'jspdf-autotable';
declare var $: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [AdmonCatalogsService, GeneralService]
})
export class CustomersComponent implements OnInit {
  // private create     : CreatePdfComponent;
  public description     : string;
  public street          : string;
  public suburb          : string;
  public interior_number : number;
  public cp              : string;
  public phone           : string;
  public phone_2         : string;
  public email           : string;
  public cellphone_1     : string;
  //Table
  public customers : Customers[];
  public dataSource: MatTableDataSource<Customers>;
  public displayedColumns = ['name','description','status','updated_by','updated_at','created_by','created_at','action'];

  
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  @ViewChild('seccion2', {static: false}) seccion2: ElementRef;

  constructor(
              private service: AdmonCatalogsService,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private generalService: GeneralService) 
              {

              this.load();
              }

  ngOnInit(): void {
  }

  applyFilter(value){
    this.dataSource.filter = value;
  }

  openDialog(action: string, obj: any){

    obj.action = action;

    const dialogRef = this.dialog.open(CustomersDialogComponent, {
      data: obj,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.load();
      }
    })
  }

  messageDelete(element){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: '¿Estas seguro que deseas eliminarlo?', 
      name: element.name}
    })
    .afterClosed()
    .subscribe((confirm: Boolean) => {
      if(confirm){
        this.delete(element);
      }else{
        this.toastr.error('Cancelado');
      }
    });
  }

  delete(element){
    
    let id = element.id;
    this.service.deleteCustomer(id).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.toastr.success(response['message']);
      this.load();
    })
  }
  load(){

    this.service.getCustomers().subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.customers = response['customers'];
      this.dataSource = new MatTableDataSource<Customers>(this.customers);
    });
  }

  // sendParamsToPDF(){
  //   let id:number;

  //   const DATA = {
  //     id:1,
  //   }
    
  //   this.create.sendData(DATA);
  // }

  valid(){
    let id =1 ;

    this.generalService.getBranchOffice(id).subscribe(response=>{
      console.log(response);

      this.description     = response['branchOffices']['description'];
      this.street          = response['branchOffices']['street'];
      this.suburb          = response['branchOffices']['subrub'];
      this.email           = response['branchOffices']['email'];
      this.interior_number = response['branchOffices']['interior_number'];
      this.cp              = response['branchOffices']['postal_code'];
      this.phone           = response['branchOffices']['phone'];
      this.phone_2         = response['branchOffices']['phone_2'];
      this.cellphone_1     = response['branchOffices']['cellphone'];

      this.createPDF();
    })

    
  }
  createPDF(){

    const doc = new jsPDF();

    const AUTOTABLE           = 'autoTable';
    const AUTOTABLE2          = 'autoTable';

    let column              = [
      {title: "Bomba"          , dataKey: "bomb"   },
      {title: ""               , dataKey: "1"   },
      {title: ""               , dataKey: "2"   },
      {title: "Preparacion"    , dataKey: "3"   },
      {title: "Suministro"     , dataKey: "4"   },
      {title: "Solicitar"      , dataKey: "5"   },
      {title: "Stock"          , dataKey: "6"   }
    ];

    let column2             = [
      {title: "Motor"          , dataKey: "engine"},
      {title: ""               , dataKey: "1"   },
      {title: ""               , dataKey: "2"   },
      {title: "Preparacion"    , dataKey: "3"   },
      {title: "Suministro"     , dataKey: "4"   },
      {title: "Solicitar"      , dataKey: "5"   },
      {title: "Stock"          , dataKey: "6"   }
    ];

    /*SECCION I*/
    //BORDE
    doc.roundedRect(7, 5, 50, 15, 3, 3);
    //IMAGENES
    doc.addImage('assets/images/logo-bovisa.png', 'png', 10, 5,10,14);
    doc.addImage('assets/images/logo-bovisa-text.png', 'png', 20, 5,35,15);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba Bipartida', 90, 5);
    doc.addImage('assets/images/bomb1.png', 'png', 85, 7,25,12);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba Sumergible', 110, 5);
    doc.addImage('assets/images/bomb2.png', 'png', 110, 8,25,10);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba Centrifuga', 135, 5);
    doc.addImage('assets/images/bomb5.png', 'png', 135, 10,20,7);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba contra ', 165, 5);
    doc.text('incendio', 167, 7);
    doc.addImage('assets/images/bomb4.png', 'png', 160, 9,25,11);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba turbina', 192, 5);
    doc.text('vertical', 193, 7);
    doc.addImage('assets/images/bomb3.png', 'png', 187, 8,25,30);
    /*SECCION II*/
    //! TITULO
    doc.setFontSize(12);
    doc.text('VENTA - REPARACION - FABRICACION - SERVICIO ', 52, 58)
    //! BORDE
    doc.roundedRect(7, 23, 190, 30, 3, 3);
    //! TEXTO
    doc.setFontSize(12);
    doc.setTextColor(10);
    doc.text('Descripcion :', 10, 28);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    doc.text(this.description, 35, 28);
    doc.setFontSize(12);
    doc.setTextColor(10);
    doc.text('Calle :', 10, 35);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    doc.text(this.street + ' ' + '#' + this.interior_number +' '+ 'COL.' +  this.suburb + ' ' + ',C.P.'+this.cp, 23, 35);
    doc.setFontSize(12);
    doc.setTextColor(10);
    doc.text('Telefono :', 10, 42);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    doc.text(this.phone , 30, 42);
    doc.setFontSize(12);
    doc.setTextColor(10);
    doc.text('Correo :', 10, 50);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    doc.text(this.email, 26, 50);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    doc.roundedRect(7, 60, 190, 40, 3, 3);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Cliente :', 10, 65)
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 26, 65)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Equipo :', 75, 65);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 92, 65);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Tipo :', 140, 65);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 151, 65);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Marca :', 10, 75);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 25, 75);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Modelo :', 75, 75);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 92, 75)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Tamaño :', 140, 75);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 160, 75);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Rpm :', 10, 85);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 22, 85)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Hp :', 75, 85);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 85, 85)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Stock :', 140, 85);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 154, 85);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Pase de salida :', 10, 95);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 42, 95);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Evaluacion :', 75, 95);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 100, 95)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Serie :', 140, 95);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 153, 95);
    /*SECCION III*/
    //TITULO
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('MEDIDA Y PESO', 80, 105);
    //BORDE
    doc.roundedRect(7, 108, 190, 40, 3, 3);
    //TEXTO
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Largo total :', 10, 120);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 80, 120);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    doc.text('No', 152, 120);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Diametro total :', 10, 129);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 80, 129);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    //doc.text('Si', 152, 129);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Peso :', 10, 139);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    doc.text('No', 80, 139);
    doc.setFontSize(12);
    doc.setTextColor(0, 65,160);
    doc.text('No', 152, 139);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Cantidad ', 75, 113);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Descripcion ', 145, 113);
    //LINEA VERTICAL TABLA MEDIDA Y PESO
    doc.roundedRect(45, 108, 0, 40, 3, 3);
    doc.roundedRect(120, 108, 0, 40, 3, 3);
    //LINEA HORIZONTAL TABLA MEDIDA Y PESO
    doc.roundedRect(7, 115, 190, 0, 3, 3);
    doc.roundedRect(7, 123, 190, 0, 3, 3);
    doc.roundedRect(7, 132, 190, 0, 3, 3);
    doc.roundedRect(7, 142, 190, 0, 3, 3);
    /*SECCION IV*/
    //TITULO
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('INSPECCION DE PIEZAS PARA REPARAR O REMPLAZAR', 45, 155);
    doc[AUTOTABLE](column, [
      {'bomb': 'Pistones','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'bomb': 'Valvulas','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'bomb': 'Vielas','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'bomb': 'Reten','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'bomb': 'Rondamiento','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'bomb': 'Tapa de aceite','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'bomb': 'Bandas','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'bomb': 'Cigueña','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'bomb': 'Pistones','1':' ','2':' ','3':' ','4':' ','5':' '}
    ],{ columnStyles: {},startY:160,headStyles: {fillColor: [0,56,107]}, margin:{ horizontal: 10}});
    doc[AUTOTABLE2](column2, [
      {'engine': 'Pistones','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'engine': 'Valvulas','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'engine': 'Vielas','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'engine': 'Reten','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'engine': 'Rondamiento','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'engine': 'Tapa de aceite','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'engine': 'Bandas','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'engine': 'Cigueña','1':' ','2':' ','3':' ','4':' ','5':' '},
      {'engine': 'Pistones','1':' ','2':' ','3':' ','4':' ','5':' '}
    ],{ columnStyles: {},startY:250,headStyles: {fillColor: [0,56,107]}, margin:{ horizontal: 10}});
    doc.save('Formato.pdf');
  }
}
