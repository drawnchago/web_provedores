import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OperationsService } from '../../operations.service';
import { WorkDialogComponent } from './work-dialog/work-dialog.component';
import { WorkOrder } from '../../../../shared/Interfaces/work_order';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/shared/services/auth.service';

import { User } from 'src/app/shared/Interfaces/user';
import { WorkFormatComponent } from './work-format/work-format.component';
import { WorkOrderDetailComponent } from './work-order-detail/work-order-detail.component';
import { MatPaginator } from '@angular/material/paginator';
import { ExitDialogComponent } from './exit-dialog/exit-dialog.component';


@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss'],
  providers: [OperationsService]
})
export class WorkOrdersComponent implements OnInit {
  user: User; //! Es la interface
  work_orders: WorkOrder[];
  dataSource: MatTableDataSource<WorkOrder>;
  displayedColumns = ['#', 'type_bomb', 'customer', 'brand', 'model', 'created_at', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialog: MatDialog, private oppService: OperationsService) {
    this.user = AuthService.getUser();
  }
  /* @ViewChild(MatSort) sort: MatSort; */


  ngOnInit(): void {

    this.oppService.getWorkOrders().subscribe(response => {
      this.work_orders = response.data;
      this.dataSource = new MatTableDataSource<WorkOrder>(this.work_orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.firstPageLabel = 'Primera Pagina';
      this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
      this.paginator._intl.lastPageLabel = 'Ultima Pagina';
      this.paginator._intl.nextPageLabel = 'Siguiente Pagina ';
      this.paginator._intl.previousPageLabel = 'Anterior Pagina ';
      /*  console.log(this.paginator);
       console.log(this.work_orders);   */
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  refresh() {
    this.oppService.getWorkOrders().subscribe(response => {
      /*  console.log(this.work_orders);  */
      this.work_orders = response.data;
      this.dataSource.data = this.work_orders;
    });
  }
  openDialog(action: string, obj: any) {

    obj.action = action;

    const dialogRef = this.dialog.open(WorkDialogComponent, {
      data: obj,
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(response => {
      this.refresh();
    })
  }
  editData(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(WorkDialogComponent, {
      data: obj,
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(response =>{
      this.refresh();
    })
  }
  oderDetail(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(WorkOrderDetailComponent, {
      data: obj,
      width: '60%'
    }); 
    dialogRef.afterClosed().subscribe(response => {
      this.refresh();
    })
  }

  exitSheet(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ExitDialogComponent, {
      data: obj,
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(response => {
      this.refresh();
    })
  }
  viewFormart(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(WorkFormatComponent, {
      data: obj,
      width: '70%'
    });
  }


}


