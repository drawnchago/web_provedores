import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { ShProccessService } from '../sh-process.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PurchaseRequisitionsDialogComponent } from './purchase-requisitions-dialog/purchase-requisitions-dialog.component';
import { PurchaseRequsitions } from './purchase-requisitions.model';

@Component({
  selector: 'app-purchase-requisitions',
  templateUrl: './purchase-requisitions.component.html',
  styleUrls: ['./purchase-requisitions.component.scss']
})
export class PurchaseRequisitionsComponent implements OnInit {

  public purchase_requisitions : PurchaseRequsitions[];
  public dataSource            : MatTableDataSource<PurchaseRequsitions>;
  public displayedColumns      = ['desc_area','comments','status','created_at','created_by','updated_at','updated_by','action'];

  constructor(              
    
    private services : ShProccessService,
    private toastr   : ToastrService,
    public dialog    : MatDialog) { 

      this.load();
    }

  ngOnInit(): void {
  }

  applyFilter(value){
    this.dataSource.filter = value;
  }
  
  openDialog(action: string, obj: any){
    obj.action = action;
    const dialogRef = this.dialog.open(PurchaseRequisitionsDialogComponent, {
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
    
    const data = { 
      id:element.id
    }
    this.services.deletePurchaseRequsition(data).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
      }else{
        this.toastr.success(response['message']);
      }

      this.load();
    })
  }

  load(){

    this.services.getPurchaseRequsitions().subscribe(response=>{

      console.log('getPurchaseRequsition');
      console.log(response);
      
        if(!response['success']){
          this.toastr.error(response['message']);
        }

        this.purchase_requisitions = response['purchase_requisitions'];
        this.dataSource = new MatTableDataSource<PurchaseRequsitions>(this.purchase_requisitions);
      });
  }

}
