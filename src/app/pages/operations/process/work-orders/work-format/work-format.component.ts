import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/Interfaces/user';
import { WorkOrder } from 'src/app/shared/Interfaces/work_order';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CatalogsService } from '../../../catalogs/catalogs.service';
import { OperationsService } from '../../../operations.service';

@Component({
  selector: 'app-work-format',
  templateUrl: './work-format.component.html',
  styleUrls: ['./work-format.component.scss']
})
export class WorkFormatComponent implements OnInit {
  action: string;
  user: User;
  work_order: WorkOrder;
  order: any;
  pieces_inspection_bomb: any;
  pieces_inspection_motor: any;
  public description: string;
  public street: string;
  public suburb: string;
  public interior_number: number;
  public cp: string;
  public phone: string;
  public phone_2: string;
  public email: string;
  public cellphone_1: string;
  constructor(public dialogRef: MatDialogRef<WorkFormatComponent>,
    public toast: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private services: CatalogsService,

    private oppService: OperationsService) {
    this.work_order = { ...data };
    this.action = data.action;
    this.user = AuthService.getUser();


  }
  ngOnInit(): void {
    this.order = this.data;
    this.oppService.getPiecesInspection('Bomba', this.order.id).subscribe(response => {
      this.pieces_inspection_bomb = response.pieces_inspection;
      console.log(this.pieces_inspection_bomb);
    });
    this.oppService.getPiecesInspection('Partes Motor', this.order.id).subscribe(response => {
      this.pieces_inspection_motor = response.pieces_inspection;
      console.log(this.pieces_inspection_motor);
    });


  }
  valid() {
    let id = 1;

    this.services.getBranchOffice(id).subscribe(response => {
      console.log(response);

      this.description = response['branchOffices']['description'];
      this.street = response['branchOffices']['street'];
      this.suburb = response['branchOffices']['subrub'];
      this.email = response['branchOffices']['email'];
      this.interior_number = response['branchOffices']['interior_number'];
      this.cp = response['branchOffices']['postal_code'];
      this.phone = response['branchOffices']['phone'];
      this.phone_2 = response['branchOffices']['phone_2'];
      this.cellphone_1 = response['branchOffices']['cellphone'];

      this.createPDF();
    })


  }
  createPDF() {

    const doc = new jsPDF();

    const AUTOTABLE = 'autoTable';
    const AUTOTABLE2 = 'autoTable';

    let column = [
      { title: "Bomba", dataKey: "piece_bomb" },
      { title: "", dataKey: "1" },
      { title: "", dataKey: "2" },
      { title: "Reparacion", dataKey: "repair" },
      { title: "Suministro", dataKey: "demand" },
      { title: "Solicitar", dataKey: "supply" },
      { title: "Stock", dataKey: "stock" }
    ];

    let column2 = [
      { title: "Motor", dataKey: "piece_bomb" },
      { title: "", dataKey: "1" },
      { title: "", dataKey: "2" },
      { title: "Reparacion", dataKey: "repair" },
      { title: "Suministro", dataKey: "demand" },
      { title: "Solicitar", dataKey: "supply" },
      { title: "Stock", dataKey: "stock" }
    ];

    /*SECCION I*/
    //BORDE
    doc.roundedRect(7, 5, 50, 15, 3, 3);
    //IMAGENES
    doc.addImage('assets/images/logo-bovisa.png', 'png', 10, 5, 10, 14);
    doc.addImage('assets/images/logo-bovisa-text.png', 'png', 20, 5, 35, 15);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba Bipartida', 90, 5);
    doc.addImage('assets/images/bomb1.png', 'png', 85, 7, 25, 12);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba Sumergible', 110, 5);
    doc.addImage('assets/images/bomb2.png', 'png', 110, 8, 25, 10);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba Centrifuga', 135, 5);
    doc.addImage('assets/images/bomb5.png', 'png', 135, 10, 20, 7);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba contra ', 165, 5);
    doc.text('incendio', 167, 7);
    doc.addImage('assets/images/bomb4.png', 'png', 160, 9, 25, 11);
    doc.setFontSize(6);
    doc.setTextColor(12);
    doc.text('Bomba turbina', 192, 5);
    doc.text('vertical', 193, 7);
    doc.addImage('assets/images/bomb3.png', 'png', 187, 8, 25, 30);
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
    doc.setTextColor(0, 65, 160);
    doc.text(this.description, 35, 28);
    doc.setFontSize(12);
    doc.setTextColor(10);
    doc.text('Calle :', 10, 35);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.street + ' ' + '#' + this.interior_number + ' ' + 'COL.' + this.suburb + ' ' + ',C.P.' + this.cp, 23, 35);
    doc.setFontSize(12);
    doc.setTextColor(10);
    doc.text('Telefono :', 10, 42);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.phone, 30, 42);
    doc.setFontSize(12);
    doc.setTextColor(10);
    doc.text('Correo :', 10, 50);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.email, 26, 50);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.roundedRect(7, 60, 190, 40, 3, 3);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Cliente :', 10, 65)
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.customer, 26, 65)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Equipo :', 75, 65);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.bomb, 92, 65);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Tipo :', 140, 65);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    //doc.text('Si', 151, 65);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Marca :', 10, 75);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.brand, 25, 75);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Modelo :', 75, 75);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.model, 92, 75)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Tamaño :', 140, 75);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.size, 160, 75);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Rpm :', 10, 85);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.rpm, 22, 85)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Hp :', 75, 85);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.hp, 85, 85)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Stock :', 140, 85);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.stock, 154, 85);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Pase de salida :', 10, 95);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.exit_pass, 42, 95);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Evaluacion :', 75, 95);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.evaluation, 100, 95)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Serie :', 140, 95);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.set, 153, 95);
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
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.total_length_quantity, 80, 120);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.total_length_description, 152, 120);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Diametro total :', 10, 129);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.total_diameter_quantity, 80, 129);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.total_diameter_description, 152, 129);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Peso :', 10, 139);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.total_weight_quantity, 80, 139);
    doc.setFontSize(12);
    doc.setTextColor(0, 65, 160);
    doc.text(this.order.total_weight_description, 152, 139);
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
    doc[AUTOTABLE](column, this.pieces_inspection_bomb,
      { columnStyles: {}, startY: 160, headStyles: { fillColor: [0, 56, 107] }, margin: { horizontal: 10 } });
    doc[AUTOTABLE2](column2, this.pieces_inspection_motor, { columnStyles: {},/*  startY: 150 */ headStyles: { fillColor: [0, 56, 107] }, margin: { horizontal: 10 } });
    doc.save('Formato.pdf');
  }

}
