import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { OppCatalogsService } from '../../op-catalogs.service';
import { TypeBomb } from '../types-bomb-dialog/types-bomb-dialog.model';

@Component({
  selector: 'app-types-bomb-dialog',
  templateUrl: './types-bomb-dialog.component.html',
  styleUrls: ['./types-bomb-dialog.component.scss'],
  providers: [OppCatalogsService]
})
export class TypesBombDialogComponent implements OnInit {

  public   form        : FormGroup;
  public   action      : string;
  public   type_bomb   : TypeBomb;
  public   name        : string;
  public   description : string;
  public   status      : number;
  public   username    : string;
  public   user_id     : number;


  constructor(
              public dialogRef : MatDialogRef<TypesBombDialogComponent>,
              public fb        : FormBuilder,
              public service   : OppCatalogsService,
              private toastr   : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
               {

                this.username = AuthService.getUser().username;
                this.user_id  = AuthService.getUser().id;

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
            id          : this.type_bomb.id,
            name        : name,
            description : description,
            status      : status,
            user_id     : this.user_id
    }

    this.service.saveTypeBomb(DATA).subscribe(response=>{

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
      this.type_bomb    = {...data};
      this.action       = data.action;
      this.form.patchValue(this.type_bomb);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }
}
