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
declare var require: any;

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



  constructor(public dialog: MatDialog, private oppService: OperationsService) {
    this.user = AuthService.getUser();
  }
  /* @ViewChild(MatSort) sort: MatSort; */

  
  ngOnInit(): void {
    /* this.dataSource.sort = this.sort; */
    this.oppService.getWorkOrders().subscribe(response => {
      /*  console.log(this.work_orders);  */
      this.work_orders = response.data;
      this.dataSource = new MatTableDataSource<WorkOrder>(this.work_orders);
    });
  }

  openDialog(action: string, obj: any ) {
    
    obj.action = action;

    const dialogRef = this.dialog.open(WorkDialogComponent, {
      data: obj,
      width: '60%'
    });
  }
  editData(action: string, obj: any){
    obj.action = action;
    const dialogRef = this.dialog.open(WorkDialogComponent, {
      data: obj,
      width: '60%'
    });
  }
  viewFormart(action: string, obj: any){
    obj.action = action;
    const dialogRef = this.dialog.open(WorkFormatComponent, {
      data: obj,
      width: '70%'
    });
  }


}


