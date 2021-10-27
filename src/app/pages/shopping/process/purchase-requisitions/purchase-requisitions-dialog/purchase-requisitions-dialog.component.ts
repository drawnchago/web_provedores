import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ShProccessService} from '../../sh-process.service';
import { PurchaseRequistion ,RequistionDetails } from './purchase-requisitions-dialog.model';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-purchase-requisitions-dialog',
  templateUrl: './purchase-requisitions-dialog.component.html',
  styleUrls: ['./purchase-requisitions-dialog.component.scss']
})
export class PurchaseRequisitionsDialogComponent implements OnInit {

  public   form                 : FormGroup;
  public   action               : string;
  public   purchase_requisition : PurchaseRequistion;
  public   purchase_details     : RequistionDetails[];
  public   name                 : string;
  public   description          : string;
  public   status               : number;
  public   username             : string;
  public   user_id              : number;
  public dataSource: MatTableDataSource<any>;
  displayedColumns = ['#', 'type_bomb', 'customer', 'brand', 'model', 'total', 'created_at', 'action'];

  constructor(              
              public dialogRef : MatDialogRef<PurchaseRequisitionsDialogComponent>,
              public fb        : FormBuilder,
              public service   : ShProccessService,
              private toastr   : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
              {
              this.username = AuthService.getUser().username;
              this.user_id   = AuthService.getUser().id;

              this.form = this.fb.group({
              description: [null, Validators.required],
              status: null
              });

              this.load(data);
              }


  ngOnInit(): void {
  }

  save(){

    let description = this.form.controls.description.value;
    let status      = this.form.controls.status.value;

    if(name == null || description == null || status == null){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
            id          : this.purchase_requisition.id,
            description : description,
            status      : status,
            user_id      : this.user_id
    }

    this.service.savePurchaseRequsitiont(DATA).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.toastr.success(response['message']);
      this.closeDialog(response['success']);
    })

  }

  load(data){

    if(data){
      this.purchase_requisition = {...data};
      console.log("data.id");
      console.log(data.id);
      this.service.getRequisitionDetails(this.purchase_requisition.id).subscribe(response=>{
        this.purchase_details = response['purchase_details'];
        console.log("this.purchase_details");
        console.log(this.purchase_details);
      })
      // this.action               = data.action;
      // this.form.patchValue(this.purchase_requisition);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

  applyFilter(filterValue){

  }

  openDialog(a, o){

  }

}
