import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/Interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExitSheet } from '../../../../shared/Interfaces/ExitSheet';
import { OperationsService } from '../../operations.service';

@Component({
  selector: 'app-exit-sheets',
  templateUrl: './exit-sheets.component.html',
  styleUrls: ['./exit-sheets.component.scss']
})
export class ExitSheetsComponent implements OnInit {

  user: User //** Interfaz de usuario */
  exitSheet: ExitSheet[]; //** Interfaz de las ordenes de entrada */
  dataSource: MatTableDataSource<ExitSheet>;
  displayedColumns = ['#', 'invoice_or_referral', 'equipment_folio', 'order', 'exit_date', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private oppService: OperationsService) {
    this.user = AuthService.getUser();
  }


  ngOnInit(): void {

    this.oppService.getExitSheet().subscribe(response => {
      this.exitSheet = response.data;
      this.dataSource = new MatTableDataSource<ExitSheet>(this.exitSheet);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.firstPageLabel = 'Primera Pagina';
      this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
      this.paginator._intl.lastPageLabel = 'Ultima Pagina';
      this.paginator._intl.nextPageLabel = 'Siguiente Pagina ';
      this.paginator._intl.previousPageLabel = 'Anterior Pagina ';
      console.log(this.exitSheet);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
