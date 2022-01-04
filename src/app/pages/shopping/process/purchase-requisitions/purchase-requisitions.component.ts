import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { ShProccessService } from '../sh-process.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PurchaseRequisitionsDialogComponent } from './purchase-requisitions-dialog/purchase-requisitions-dialog.component';
import { PurchaseRequsitions, PurchaseRequsition, RequistionDetails, Levels, Conversation } from './purchase-requisitions.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { style } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/shared/Interfaces/user';
import { element } from 'protractor';

@Component({
  selector: 'app-purchase-requisitions',
  templateUrl: './purchase-requisitions.component.html',
  styleUrls: ['./purchase-requisitions.component.scss'],
  providers: [AuthService]
})
export class PurchaseRequisitionsComponent implements OnInit {

  //FORMGROUP
  public form: FormGroup;
  //NUMBER
  public id: number;
  public index: number;
  public user_id: number;
  public max_level: number;
  public requisition_id: number;
  public level_id: number;
  public area_id: number;
  public status : number;
  public subtotal : number;
  public iva: number;
  public total: number;
  //STRING
  public area: string;
  public created_by: string;
  //DATE
  public created_at: Date;
  //ARRAY
  public purchase_requisitions: PurchaseRequsitions[];
  public purchase_requisition: PurchaseRequsition;
  public requisition_details: RequistionDetails[];
  public levels: Levels[];
  public conversation: Conversation[];
  //BOOLEAN
  public panel_open_states: boolean;
  public levels_exist: boolean;
  public conversation_exist: boolean;
  //MATTABLEDATASOURCE
  public dataSource: MatTableDataSource<PurchaseRequsitions>;
  public dataSource2: MatTableDataSource<RequistionDetails>;
  public image = "assets/images/users/2.jpg";
  //COLUMNS
  public displayedColumns = ['#', 'id', 'desc_area', 'comments', 'status', 'created_at', 'created_by', 'action'];
  public displayedColumns2 = ['desc_product', 'quantity', 'unit_price', 'subtotal'];
  user: User;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private services: ShProccessService,
    private toastr: ToastrService,
    public fb: FormBuilder,
    public dialog: MatDialog) {

    this.panel_open_states = false;
    this.conversation_exist = false;
    this.levels_exist = false;
    this.index = 0;
    this.user_id = AuthService.getUser().id;
    this.user = AuthService.getUser();
    this.form = this.fb.group({
      message: [null, Validators.required],
    });

    this.load();
  }

  ngOnInit(): void {
  }

  applyFilter(value) {
    this.dataSource.filter = value;
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(PurchaseRequisitionsDialogComponent, {
      data: obj,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.load();
      }
    })
  }


  messageDiaglog(element, type) {
    if (type == 1) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: '¿Estas seguro que deseas eliminarlo?',
          name: element.name
        }
      }).afterClosed()
        .subscribe((confirm: Boolean) => {
          if (confirm) {
            this.delete(element);
          } else {
            this.toastr.warning('Cancelado');
          }
        });
    } else if (type == 2) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: '¿Estas seguro que deseas aprobar la requisción: ' + element.id + '?',
          name: element.name
        }
      }).afterClosed()
        .subscribe((confirm: Boolean) => {
          if (confirm) {
            this.approveOrDeny(element, 1);
          } else {
            this.toastr.warning('Cancelado');
          }
        });
    } else if (type == 3) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: '¿Estas seguro que deseas rechazar la requisción: ' + element.id + '?',
          name: element.name
        }
      }).afterClosed()
        .subscribe((confirm: Boolean) => {
          if (confirm) {
            this.approveOrDeny(element, 2);
          } else {
            this.toastr.warning('Cancelado');
          }
        });
    }

  }

  delete(element) {

    const data = {
      id: element.id
    }
    this.services.deletePurchaseRequsition(data).subscribe(response => {

      if (!response['success']) {
        this.toastr.error(response['message']);
      } else {
        this.toastr.success(response['message']);
      }

      this.load();
    })
  }
  approveOrDeny(element, type) {
    const data = {
      id: element.id,
      type: type,
      user_id: this.user.id
    }
    this.services.approveOrDeny(data).subscribe(response => {
      if (response['success'] == true) {
        this.toastr.success(response['message']);
      } else {
        this.toastr.error(response['message']);
      }
      this.load();
    })
  }
  getRequisitionDetails(obj: PurchaseRequsition, to_print) {
    this.id = obj.id;
    this.area = obj.desc_area;
    this.created_by = obj.created_by;
    this.created_at = obj.created_at;
    this.status = obj.status;
  
    this.services.getRequisitionDetails(obj.id, obj.area_id).subscribe(response => {

      if (!response['success']) {
        this.toastr.error(response['message']);
      }

      this.max_level = response['levels'].length;

      if (this.max_level > 0) {
        this.levels_exist = true;
      }

      this.requisition_details = response['requistion_details'];
      this.subtotal = response['subtotal'];
      this.iva = response['iva'];
      this.total = response['total'];
      this.levels = response['levels'];
      this.dataSource2 = new MatTableDataSource<RequistionDetails>(this.requisition_details);

      if (to_print === 1) {
        this.createPDF();
      } else {
        this.nextMatTab();
      }


    });

  }

  nextMatTab() {
    this.index++;

    if (this.index > 3) {
      this.index = 0;
    }

  }

  onTabChanged(e) {
    this.index = e.index;
    console.log(this.index);

  }

  getApprover() {
    this.panel_open_states = false;
  }

  getConversations(element) {

    this.requisition_id = this.id;
    this.level_id = element.level ? element.level : element.level_id;
    this.area_id = element.area_id;

    this.services.getConversation(this.requisition_id, this.level_id, this.area_id).subscribe(response => {
      this.conversation_exist = response['success'];
      this.conversation = response['conversation'];
    });
  }

  saveConversation() {

    let message: string = this.form.controls.message.value;

    const DATA = {
      message: message,
      requisition_id: this.requisition_id,
      level_id: this.level_id,
      area_id: this.area_id,
      user_id: this.user_id
    }

    this.services.saveConversation(DATA).subscribe(response => {

      if (!response['success']) {
        this.toastr.error(response['message']);
        return;
      }


      this.conversation_exist = true;
      this.getConversations(DATA);
      this.form.controls.message.setValue('');

    });
  }

  createPDF() {

    console.log("this.requisition_details");
    console.log(this.requisition_details);

    let doc = new jsPDF('landscape');
    let doc2 = new jsPDF('landscape');

    doc.roundedRect
    // let created : string = this.created_at.toString();
    doc.setLineDashPattern([5, 2], 100);
    doc.line(12, 25, 281, 25);
    doc.setLineDashPattern([5, 2], 100);
    doc.line(281, 80, 281, 25);
    doc.setLineDashPattern([5, 2], 100);
    doc.line(12, 80, 12, 25);
    doc.setLineDashPattern([5, 2], 100);
    doc.line(12, 80, 281, 80);
    doc.setFontSize(14);
    doc.text("BOMBAS VILLASANA S.A DE C.V", 110, 15);
    doc.setFontSize(11);
    doc.text("R-", 41, 45, { align: 'left' });
    doc.setFontSize(14);
    doc.text(this.id.toString(), 49, 45, { align: 'left' });
    doc.setFontSize(11);
    doc.text("Fecha", 210, 45);
    // doc.setFontSize(14);
    // doc.text(created, 208, 45);
    doc.setFontSize(11);
    doc.text("Direccion:", 16, 65);
    doc.setFontSize(14);
    doc.text("Ayutla & Lib. Lic. Carlos Salinas de Gortari, Occidental, 25640 Frontera, Coah., Mexico", 37, 65);
    doc.setFontSize(11);
    doc.text("Area solicitante:", 16, 75);
    doc.setFontSize(14);
    doc.text(this.area, 45, 75);
    doc.setFontSize(11);

    doc.text("Conceptos:", 16, 93, { align: 'left' });

    let columns = [
      { title: "Clave", dataKey: "code" },
      { title: "Producto", dataKey: "desc_product" },
      { title: "Cantidad", dataKey: "quantity" },
      { title: "Precio por unidad", dataKey: "unit_price" },
      { title: "Subtotal", dataKey: "subtotal" }
    ];

    const autoTable = 'autoTable';
    doc[autoTable](columns,
      this.requisition_details, {
      styles: {
        cellPadding: 3,
        fontSize: 8,
        tableWidth: 'auto',
        lineWidth: 1,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        borderColor: [255, 255, 255]
      },
      columnStyles: {
        code: { fontStyle: 'bold', textColor: [0, 0, 0] },
        product: { fontStyle: 'bold', textColor: [0, 0, 0] },
        quantity: { fontStyle: 'bold', textColor: [0, 0, 0] },
        price: { fontStyle: 'bold', textColor: [0, 0, 0] },
        subtotal: { fontStyle: 'bold', textColor: [0, 0, 0] }
      },
      startY: 95
    }
    );

    const addFooters = doc => {
      const pageCount = doc.internal.getNumberOfPages()

      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
          align: 'center'
        })
      }
    }

    doc.save('Requisicion_' + 'R-' + this.id + '_.pdf');
  }

  load() {
   /*  this.toastr.info('Para ver los detalles de la requisición dar doble click en el registro', 'Info', {
      timeOut: 7000,
      positionClass: 'toast-top-center'
    });
 */
    this.services.getPurchaseRequsitions(this.user_id).subscribe(response => {

      if (!response['success']) {
        this.toastr.error(response['message']);
      }

      this.purchase_requisitions = response['purchase_requisitions'];
      this.dataSource = new MatTableDataSource<PurchaseRequsitions>(this.purchase_requisitions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.firstPageLabel = 'Primera Pagina';
      this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
      this.paginator._intl.lastPageLabel = 'Ultima Pagina';
      this.paginator._intl.nextPageLabel = 'Siguiente Pagina ';
      this.paginator._intl.previousPageLabel = 'Anterior Pagina ';
    });
  }
}
