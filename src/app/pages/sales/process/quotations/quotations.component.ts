import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Quotation } from 'src/app/shared/Interfaces/quotation';
import { SalesProcessService } from '../sales-process.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { QuotationDialogComponent } from './quotation-dialog/quotation-dialog.component';
import { User } from 'src/app/shared/Interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
declare var $: any;

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss'],
  providers: [SalesProcessService]
})
export class QuotationsComponent implements OnInit {

  public dataSource: MatTableDataSource<Quotation>;
  filterForm: FormGroup;
  startDate: Date;
  endDate: Date;
  displayedColumns = ['name', 'created_at', 'customer', 'contact', 'phone', 'subtotal', 'iva', 'total', 'created_by','actions'];
  quotations: Quotation[];
  user: User;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public fb: FormBuilder,
    private salesService: SalesProcessService,
    private dialog: MatDialog) {

    this.user = AuthService.getUser();
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 7)
    this.endDate = new Date();
    this.filterForm = fb.group({
      start_date: this.startDate,
      end_date: this.endDate,
      search: null
    });
    this.dataSource = new MatTableDataSource<Quotation>();
    this.search();

  }

  ngOnInit(): void {
  }

  applyFilter(value) {
    this.dataSource.filter = value;
  }

  openDialog(action: string, obj: any) {
    let dialog = this.dialog.open(QuotationDialogComponent, {
      data: { action: action, quotation: obj },
      maxHeight: '90%',
      maxWidth: '63%'
    });

    dialog.afterClosed().subscribe(result => {
      this.search();
    })
  }

  search() {
    let data = this.filterForm.value;
    data.start_date = moment(data.start_date).format('YYYY-MM-DD');
    data.end_date = moment(data.end_date).format('YYYY-MM-DD');
    this.salesService.getQuoations(data).subscribe(result => {
      console.log(result);
      this.quotations = result.info;
      this.dataSource.data = this.quotations;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  dialogDelete(){
    $.confirm({
      title: 'Eliminar',
      content: '¿Esta seguro que desea eliminar la cotización?',
      type: 'dark',
      backgroundDismissAnimation: 'glow',
      useBootstrap: false,
      boxWidth: '30%',
      buttons: {
          confirm: {
              btnClass: 'btn-blue',
              text: 'Si',
              keys: ['enter'],
              action: function() {
                
              }
          },
          cancel: {
              text: 'No',
              keys: ['esc'],
              action: function () {
                
              }
          }
      }
    });
  }


}
