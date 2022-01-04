import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { OppCatalogsService } from '../../op-catalogs.service';
import { BrandBomb } from './brands-bomb-dialog.model';

@Component({
  selector: 'app-brands-bomb-dialog',
  templateUrl: './brands-bomb-dialog.component.html',
  styleUrls: ['./brands-bomb-dialog.component.scss'],
  providers: [OppCatalogsService]
})
export class BrandsBombDialogComponent implements OnInit {

  public   form        :  FormGroup;
  public   action      : string;
  public   brandsBomb  : BrandBomb;
  public   name        : string;
  public   description : string;
  public   status      : number;
  public   username    : string;
  public   user_id     : number;
 
  constructor(
              public dialogRef : MatDialogRef<BrandsBombDialogComponent>,
              public fb        : FormBuilder,
              public service   : OppCatalogsService,
              private toastr   : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
               {

                this.username = AuthService.getUser().username;
                this.user_id  = AuthService.getUser().id;

                this.form = this.fb.group({
                  name: [null, Validators.required],
                  description: [null, Validators.required],
                  status: null
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
            id          : this.brandsBomb.id,
            name        : name,
            description : description,
            status      : status,
            user_id      : this.user_id
    }

    this.service.saveBrandBomb(DATA).subscribe(response=>{

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
      this.brandsBomb     = {...data};
      this.action         = data.action;
      this.form.patchValue(this.brandsBomb);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }
}
