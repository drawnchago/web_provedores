import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { WaCatalogsService} from '../../wa-catalogs.service';
import { Warehouse } from '../warehouses-dialog/warehouses-dialog.model';


@Component({
  selector: 'app-warehouses-dialog',
  templateUrl: './warehouses-dialog.component.html',
  styleUrls: ['./warehouses-dialog.component.scss']
})
export class WarehousesDialogComponent implements OnInit {

  public   form        : FormGroup;
  public   action      : string;
  public   warehouse   : Warehouse;
  public   name        : string;
  public   description : string;
  public   status      : number;
  public   username    : string;
  public   user_id     : number;

  constructor(              
              public dialogRef : MatDialogRef<WarehousesDialogComponent>,
              public fb        : FormBuilder,
              public service   : WaCatalogsService,
              private toastr   : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
              {
              this.username    = AuthService.getUser().username;
              this.user_id     = AuthService.getUser().id;

              this.form = this.fb.group({
                description : [null, Validators.required],
                status      : null
              });

              this.load(data);
              }


  ngOnInit(): void {
  }

  save(){

    let description = this.form.controls.description.value;
    let status      = this.form.controls.status.value;

    if(description == null || status == null){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
            id          : this.warehouse.id,
            description : description,
            status      : status,
            user_id      : this.user_id
    }

    this.service.saveWarehouses(DATA).subscribe(response=>{

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
      this.warehouse      = {...data};
      this.action         = data.action;
      this.form.patchValue(this.warehouse);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

}
