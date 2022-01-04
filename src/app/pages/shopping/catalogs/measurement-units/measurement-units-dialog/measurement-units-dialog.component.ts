import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ShCatalogsService} from '../../sh-catalogs.service';
import { MeasurementUnit } from '../measurement-units-dialog/measurement-units-dialog.model';


@Component({
  selector: 'app-measurement-units-dialog',
  templateUrl: './measurement-units-dialog.component.html',
  styleUrls: ['./measurement-units-dialog.component.scss']
})
export class MeasurementUnitsDialogComponent implements OnInit {

  public   form              : FormGroup;
  public   action            : string;
  public   measurement_units : MeasurementUnit;
  public   name              : string;
  public   description       : string;
  public   status            : number;
  public   username          : string;
  public   user_id           : number;

  constructor(              
              public dialogRef : MatDialogRef<MeasurementUnitsDialogComponent>,
              public fb        : FormBuilder,
              public service   : ShCatalogsService,
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
            id          : this.measurement_units.id,
            description : description,
            status      : status,
            user_id      : this.user_id
    }

    this.service.saveMeasurementUnit(DATA).subscribe(response=>{

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
      this.measurement_units     = {...data};
      this.action                = data.action;
      this.form.patchValue(this.measurement_units);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

}
