import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OperationsService } from '../../operations.service';

import { AuthService } from 'src/app/shared/services/auth.service';

import { User } from 'src/app/shared/Interfaces/user';
import { OrderSheet } from 'src/app/shared/Interfaces/order_sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-order-sheets',
  templateUrl: './order-sheets.component.html',
  styleUrls: ['./order-sheets.component.scss'],
  providers: [OperationsService]
})

export class OrderSheetsComponent implements OnInit {

  user: User //** Interfaz de usuario */
  orderSheet: OrderSheet[]; //** Interfaz de las ordenes de entrada */
  dataSource: MatTableDataSource<OrderSheet>;
  displayedColumns = ['#', 'work_order_id', 'number_or_folio_requisition', 'zone', 'priority_id', 'created_at'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private oppService: OperationsService) {
    this.user = AuthService.getUser();
  }

  ngOnInit(): void {
    this.oppService.getOrdertSheets().subscribe(response => {
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
}
