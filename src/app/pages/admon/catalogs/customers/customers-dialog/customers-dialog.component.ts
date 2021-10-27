import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { AdmonCatalogsService } from '../../admon-catalogs.service';
import { Customer } from './customers-dialog.model';

@Component({
  selector: 'app-customers-dialog',
  templateUrl: './customers-dialog.component.html',
  styleUrls: ['./customers-dialog.component.scss'],
  providers: [AdmonCatalogsService]
})
export class CustomersDialogComponent implements OnInit {

  public   form              : FormGroup;
  public   action            : string;
  public   customer          : Customer;
  public   name              : string;
  public   description       : string;
  public   status            : number;
  public   username          : string;
  public   user_id           : number;


  constructor(
              public dialogRef : MatDialogRef<CustomersDialogComponent>,
              public fb        : FormBuilder,
              public service   : AdmonCatalogsService,
              private toastr   : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
               {

                this.username  = AuthService.getUser().username;
                this.user_id   = AuthService.getUser().id;

                this.form = this.fb.group({
                  name:        [null, Validators.required],
                  description: [null, Validators.required],
                  status:      null
                });

                this.load(data);
               }

               

  ngOnInit(): void {
  }

  save(){

    let name        = this.form.controls.name.value;
    let description = this.form.controls.description.value;
    let status      = this.form.controls.status.value;

    if(name == null || description == null || status == null){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
            id          : this.customer.id,
            name        : name,
            description : description,
            status      : status,
            user_id     : this.user_id
    }

    this.service.saveCustomer(DATA).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
      }else{
        this.toastr.success(response['message']);
        this.closeDialog(response['success']);
      }
     
    })

  }

  load(data){

    if(data){
      this.customer     = {...data};
      this.action       = data.action;
      this.form.patchValue(this.customer);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }
}
