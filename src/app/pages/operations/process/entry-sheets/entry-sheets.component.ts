import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { OrderSheet } from 'src/app/shared/Interfaces/order_sheet';
import { User } from 'src/app/shared/Interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OperationsService } from '../../operations.service';

@Component({
  selector: 'app-entry-sheets',
  templateUrl: './entry-sheets.component.html',
  styleUrls: ['./entry-sheets.component.scss']
})
export class EntrySheetsComponent implements OnInit {

  user: User //** Interfaz de usuario */
  orderSheet: OrderSheet[]; //** Interfaz de las ordenes de entrada */
  pdfData : any;
  dataSource: MatTableDataSource<OrderSheet>;
  displayedColumns = ['#',/*  'work_order_id' */'number_or_folio_requisition', 'zone', 'priority_id', 'created_at', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private oppService: OperationsService) {
    this.user = AuthService.getUser();
  }

  ngOnInit(): void {
    this.oppService.getOrdersEntry().subscribe(response => {
      this.orderSheet = response.data;
      this.dataSource = new MatTableDataSource<OrderSheet>(this.orderSheet);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.firstPageLabel = 'Primera Pagina';
      this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
      this.paginator._intl.lastPageLabel = 'Ultima Pagina';
      this.paginator._intl.nextPageLabel = 'Siguiente Pagina ';
      this.paginator._intl.previousPageLabel = 'Anterior Pagina ';
      console.log(this.orderSheet);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  createPDF(element) {
  /*  console.log(element); */
    let doc = new jsPDF('p', 'mm', 'a4');
    var urlImage = new Image();
    let position: string;
    let pass: string;
    let users: string;
    let zone: string;
    let folio: string;
    let date: string;
    let equipment: string;
    let customer: string;
    let place: string;
    let conditions: string;
    let damage: string;
    let conditions2: string;
    let aplication: string;
    let fluid: string;
    let temperature: string;
    let pressure: string;
    let photo: string;
    
    urlImage.src = '../assets/images/bomb1.png';
    position = element.position_order;
    pass = element.exit_pass;
    users = element.user;
    zone =  element.zone;
    folio = "1";
    date = moment(element.entry_date).format("YYYY-MM-DD");
    equipment = element.description_entry;
    customer = element.customer;
    place = element.place;
    conditions = element.type;
    damage = element.description_entry;
    conditions2 = element.equipment_application;
    aplication = element.equipment_application;
    fluid = element.handling_fluid;
    temperature = element.handling_fluid;
    pressure = element.exposed_pressure;
    photo = "photo_1";

    //DATOS GENERALES
    doc.addImage(urlImage, 'JPG', 100, 10, 60, 25);
    doc.setFontSize(10);
    doc.setFont('helvetica');
    doc.text(position, 60, 45);
    doc.text(pass, 60, 50);
    doc.text(users, 60, 55);
    doc.text(zone, 60, 60);
    doc.text(folio, 175, 50);
    doc.text(date, 170, 60);
    //SECCION DE EQUIPO ENTRA AL TALLER
    doc.text(equipment, 50, 80, { align: 'center' });
    doc.text(customer, 165, 80, { align: 'center' });
    //SECCOPM DE TIPO DE ENTRAADA
    doc.text(place, 27, 105, { align: 'center' });
    doc.text(conditions, 120, 105, { align: 'center' });
    //SECCION DE DESCRIPCION
    doc.text(damage, 100, 135, { align: 'center' });
    //SECCION DE CONDICION DE EQUIPO
    doc.text(conditions2, 105, 160, { align: 'center' });
    doc.text(aplication, 60, 170);
    doc.text(fluid, 60, 175);
    doc.text(temperature, 60, 180);
    doc.text(pressure, 60, 185);
    //SECCION DE NUMERO O FOLIO
    doc.text(folio, 95, 200);
    //SECCION DE FOTOGRAFIA
    doc.addImage(urlImage, 'JPG',  75, 225,0,0);
    //SECCION DE CREACION DE PDF
    doc.setDrawColor(10, 0, 0)
    doc.setFillColor(86, 163, 234)
    doc.rect(10, 26, 190, 5, 'F')
    doc.setDrawColor(10, 0, 0)
    doc.setFillColor(217, 217, 217)
    doc.rect(10, 66, 190, 5, 'F')
    doc.rect(10, 86, 190, 5, 'F')
    doc.rect(10, 116, 190, 5, 'F')
    doc.rect(10, 146, 190, 5, 'F')
    doc.rect(10, 186, 190, 5, 'F')
    doc.rect(10, 206, 190, 5, 'F')
    doc.setDrawColor(10, 0, 0)
    doc.setFillColor(86, 163, 234)
    doc.rect(10, 26, 190, 5)
    doc.rect(10, 31, 190, 5)
    doc.rect(10, 41, 190, 5)
    doc.rect(10, 46, 190, 5)
    doc.rect(10, 51, 190, 5)
    doc.rect(10, 56, 190, 5)
    doc.rect(10, 66, 190, 5)
    doc.rect(10, 71, 190, 15)
    doc.rect(10, 86, 190, 5)
    doc.rect(10, 91, 190, 5)
    doc.rect(10, 96, 190, 20)
    doc.rect(10, 116, 190, 5)
    doc.rect(10, 121, 190, 25)
    doc.rect(10, 146, 190, 5)
    doc.rect(10, 151, 190, 15)
    doc.rect(10, 166, 190, 5)
    doc.rect(10, 171, 190, 5)
    doc.rect(10, 176, 190, 5)
    doc.rect(10, 181, 190, 5)
    doc.rect(10, 186, 190, 5)
    doc.rect(10, 191, 190, 15)
    doc.rect(10, 206, 190, 5)
    doc.rect(10, 211, 190, 55)
    doc.setDrawColor(10, 0, 0)
    doc.setLineWidth(0.4)
    doc.line(56, 41, 56, 61)
    doc.line(156, 41, 156, 61)
    doc.line(105, 66, 105, 86)
    doc.line(46, 91, 46, 116)
    doc.line(56, 166, 56, 186)
    doc.line(25, 281, 65, 281)
    doc.line(141, 281, 181, 281)
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text("BOVISA SA DE CV", 100, 25, { align: 'center' });
    doc.text("EQUIPO ENTRA AL TALLER", 45, 70, { align: 'center' });
    doc.text("CLIENTE", 155, 70, { align: 'center' });
    doc.text("TIPO DE ENTRADA DE EQUIPO Y LUGAR DONDE SE REALIZARA LA REPARACION", 40, 90);
    doc.text("DESCRIPCION DEL POSIBLE DAÑO O MOTIVOS DE SALIDA A REPARACION", 45, 120);
    doc.text("CONDICIONES DE EQUIPO, COMENTARIOS ADICIONALES PARA TALLER O COMENTARIOS ESPECIALES DE CLIENTE", 10, 150);
    doc.text("NUMERO O FOLIO DE LA REQUISCIÓN", 75, 190);
    doc.text("FOTOGRAFIA DE ENTRA DEL ERQUIPO DE 2 A 4 FOTOS", 65, 210);
    doc.setFontSize(10);
    doc.text("(PARA EL MANTENIMIENTO PREVENTIVO,CORRECTIVO,REPARACION Y/O GARANTIAS)", 25, 35);
    doc.text("LUGAR", 25, 95);
    doc.text("CONDICIONES DE EQUIPO(REPARACION,MANTENIMIENTO,MUESTRA,GARANTIA)", 55, 95);
    doc.text("HOJA DE ENTRADA DE EQUIPOS", 100, 30, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text("POSICION EN HOJA DE PEDIDOS", 10, 45);
    doc.text("FOLIO DE EQUIPO", 167, 45);
    doc.text("PASE DE SALIDA", 10, 50);
    doc.text("USUARIOS", 10, 55);
    doc.text("FECHA", 172, 55);
    doc.text("ZONA", 10, 60);
    doc.text("APLICACION DEL GRUPO", 10, 170);
    doc.text("FLUIDO QUE MANEJA", 10, 175);
    doc.text("TEMPERATURA DE TRABAJO", 10, 180);
    doc.text("PRESION EXPUESTA DURANTE", 10, 185);
    doc.text("NOMBRE Y FIRMA", 45, 285, { align: 'center' });
    doc.text("SOLICITANTE DEL SERVICIO", 25, 290, { align: 'left' });
    doc.text("NOMBRE Y FIRMA ", 160, 285, { align: 'center' });
    doc.text("TESTIGO DE ENTRADA ", 145, 290, { align: 'left' });

    doc.save("hoja_de_entrada_de_equipo");
  }


  createPDFClean() {
    /*  console.log(element); */
      let doc = new jsPDF('p', 'mm', 'a4');
      var urlImage = new Image();
      let position: string;
      let pass: string;
      let users: string;
      let zone: string;
      let folio: string;
      let date: string;
      let equipment: string;
      let customer: string;
      let place: string;
      let conditions: string;
      let damage: string;
      let conditions2: string;
      let aplication: string;
      let fluid: string;
      let temperature: string;
      let pressure: string;
      let photo: string;
      
      urlImage.src = '../assets/images/bomb1.png';
      position = ' ';
      pass = ' ';
      users = ' ';
      zone =  ' ';
      folio = ' ';
      date = ' ';
      equipment = ' ';
      customer = ' ';
      place = ' ';
      conditions = ' ';
      damage = ' ';
      conditions2 = ' ';
      aplication = ' ';
      fluid = ' ';
      temperature = ' ';
      pressure = ' ';
      photo = " ";
  
      //DATOS GENERALES
      doc.addImage(urlImage, 'JPG', 100, 10, 60, 25);
      doc.setFontSize(10);
      doc.setFont('helvetica');
      doc.text(position, 60, 45);
      doc.text(pass, 60, 50);
      doc.text(users, 60, 55);
      doc.text(zone, 60, 60);
      doc.text(folio, 175, 50);
      doc.text(date, 170, 60);
      //SECCION DE EQUIPO ENTRA AL TALLER
      doc.text(equipment, 50, 80, { align: 'center' });
      doc.text(customer, 165, 80, { align: 'center' });
      //SECCOPM DE TIPO DE ENTRAADA
      doc.text(place, 27, 105, { align: 'center' });
      doc.text(conditions, 120, 105, { align: 'center' });
      //SECCION DE DESCRIPCION
      doc.text(damage, 100, 135, { align: 'center' });
      //SECCION DE CONDICION DE EQUIPO
      doc.text(conditions2, 105, 160, { align: 'center' });
      doc.text(aplication, 60, 170);
      doc.text(fluid, 60, 175);
      doc.text(temperature, 60, 180);
      doc.text(pressure, 60, 185);
      //SECCION DE NUMERO O FOLIO
      doc.text(folio, 95, 200);
      //SECCION DE FOTOGRAFIA
      doc.text(photo, 75, 225);
      //SECCION DE CREACION DE PDF
      doc.setDrawColor(10, 0, 0)
      doc.setFillColor(86, 163, 234)
      doc.rect(10, 26, 190, 5, 'F')
      doc.setDrawColor(10, 0, 0)
      doc.setFillColor(217, 217, 217)
      doc.rect(10, 66, 190, 5, 'F')
      doc.rect(10, 86, 190, 5, 'F')
      doc.rect(10, 116, 190, 5, 'F')
      doc.rect(10, 146, 190, 5, 'F')
      doc.rect(10, 186, 190, 5, 'F')
      doc.rect(10, 206, 190, 5, 'F')
      doc.setDrawColor(10, 0, 0)
      doc.setFillColor(86, 163, 234)
      doc.rect(10, 26, 190, 5)
      doc.rect(10, 31, 190, 5)
      doc.rect(10, 41, 190, 5)
      doc.rect(10, 46, 190, 5)
      doc.rect(10, 51, 190, 5)
      doc.rect(10, 56, 190, 5)
      doc.rect(10, 66, 190, 5)
      doc.rect(10, 71, 190, 15)
      doc.rect(10, 86, 190, 5)
      doc.rect(10, 91, 190, 5)
      doc.rect(10, 96, 190, 20)
      doc.rect(10, 116, 190, 5)
      doc.rect(10, 121, 190, 25)
      doc.rect(10, 146, 190, 5)
      doc.rect(10, 151, 190, 15)
      doc.rect(10, 166, 190, 5)
      doc.rect(10, 171, 190, 5)
      doc.rect(10, 176, 190, 5)
      doc.rect(10, 181, 190, 5)
      doc.rect(10, 186, 190, 5)
      doc.rect(10, 191, 190, 15)
      doc.rect(10, 206, 190, 5)
      doc.rect(10, 211, 190, 55)
      doc.setDrawColor(10, 0, 0)
      doc.setLineWidth(0.4)
      doc.line(56, 41, 56, 61)
      doc.line(156, 41, 156, 61)
      doc.line(105, 66, 105, 86)
      doc.line(46, 91, 46, 116)
      doc.line(56, 166, 56, 186)
      doc.line(25, 281, 65, 281)
      doc.line(141, 281, 181, 281)
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text("BOVISA SA DE CV", 100, 25, { align: 'center' });
      doc.text("EQUIPO ENTRA AL TALLER", 45, 70, { align: 'center' });
      doc.text("CLIENTE", 155, 70, { align: 'center' });
      doc.text("TIPO DE ENTRADA DE EQUIPO Y LUGAR DONDE SE REALIZARA LA REPARACION", 40, 90);
      doc.text("DESCRIPCION DEL POSIBLE DAÑO O MOTIVOS DE SALIDA A REPARACION", 45, 120);
      doc.text("CONDICIONES DE EQUIPO, COMENTARIOS ADICIONALES PARA TALLER O COMENTARIOS ESPECIALES DE CLIENTE", 10, 150);
      doc.text("NUMERO O FOLIO DE LA REQUISCIÓN", 75, 190);
      doc.text("FOTOGRAFIA DE ENTRA DEL ERQUIPO DE 2 A 4 FOTOS", 65, 210);
      doc.setFontSize(10);
      doc.text("(PARA EL MANTENIMIENTO PREVENTIVO,CORRECTIVO,REPARACION Y/O GARANTIAS)", 25, 35);
      doc.text("LUGAR", 25, 95);
      doc.text("CONDICIONES DE EQUIPO(REPARACION,MANTENIMIENTO,MUESTRA,GARANTIA)", 55, 95);
      doc.text("HOJA DE ENTRADA DE EQUIPOS", 100, 30, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text("POSICION EN HOJA DE PEDIDOS", 10, 45);
      doc.text("FOLIO DE EQUIPO", 167, 45);
      doc.text("PASE DE SALIDA", 10, 50);
      doc.text("USUARIOS", 10, 55);
      doc.text("FECHA", 172, 55);
      doc.text("ZONA", 10, 60);
      doc.text("APLICACION DEL GRUPO", 10, 170);
      doc.text("FLUIDO QUE MANEJA", 10, 175);
      doc.text("TEMPERATURA DE TRABAJO", 10, 180);
      doc.text("PRESION EXPUESTA DURANTE", 10, 185);
      doc.text("NOMBRE Y FIRMA", 45, 285, { align: 'center' });
      doc.text("SOLICITANTE DEL SERVICIO", 25, 290, { align: 'left' });
      doc.text("NOMBRE Y FIRMA ", 160, 285, { align: 'center' });
      doc.text("TESTIGO DE ENTRADA ", 145, 290, { align: 'left' });
  
      doc.save("hoja_de_entrada_de_equipo");
    }
}
