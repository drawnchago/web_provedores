import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ShCatalogsService} from '../../sh-catalogs.service';
import { Cfdi } from './cfdi-dialog.model';


@Component({
  selector: 'app-cfdi-dialog',
  templateUrl: './cfdi-dialog.component.html',
  styleUrls: ['./cfdi-dialog.component.scss']
})
export class CfdiDialogComponent implements OnInit {

  public form           : FormGroup;
  public action         : string;
  public cfdi           : Cfdi;
  public name           : string;
  public description    : string;
  public status         : number;
  public username       : string;
  public user_id        : number;

  constructor(              
              public dialogRef : MatDialogRef<CfdiDialogComponent>,
              public fb        : FormBuilder,
              public service   : ShCatalogsService,
              private toastr   : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
              {
              this.username = AuthService.getUser().username;
              this.user_id   = AuthService.getUser().id;

              this.form = this.fb.group({
              code        : [null, Validators.required],
              description : [null, Validators.required],
              status      : null
              });

              this.load(data);
              }


  ngOnInit(): void {
  }

  save(){

    let code        = this.form.controls.code.value;
    let description = this.form.controls.description.value;
    let status      = this.form.controls.status.value;

    if(description == '' || code == '' || status == null){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
            id          : this.cfdi.id,
            code        : code,
            description : description,
            status      : status,
            user_id     : this.user_id
    }

    this.service.saveCfdi(DATA).subscribe(response=>{

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
      this.cfdi     = {...data};
      this.action             = data.action;
      this.form.patchValue(this.cfdi);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

}
