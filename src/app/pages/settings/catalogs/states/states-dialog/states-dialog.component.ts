import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { StCatalogsService} from '../../st-catalogs.service';
import { State } from '../states-dialog/states-dialog.model';


@Component({
  selector: 'app-states-dialog',
  templateUrl: './states-dialog.component.html',
  styleUrls: ['./states-dialog.component.scss']
})
export class StatesDialogComponent implements OnInit {

  public   form        : FormGroup;
  public   action      : string;
  public   state       : State;
  public   name        : string;
  public   description : string;
  public   status      : number;
  public   username    : string;
  public   user_id     : number;

  constructor(              
              public dialogRef : MatDialogRef<StatesDialogComponent>,
              public fb        : FormBuilder,
              public service   : StCatalogsService,
              private toastr   : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
              {
              this.username = AuthService.getUser().username;
              this.user_id   = AuthService.getUser().id;

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

    if(name == null || description == null || status == null){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
            id          : this.state.id,
            description : description,
            status      : status,
            user_id      : this.user_id
    }

    this.service.saveState(DATA).subscribe(response=>{

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
      this.state     = {...data};
      this.action    = data.action;
      this.form.patchValue(this.state);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

}
