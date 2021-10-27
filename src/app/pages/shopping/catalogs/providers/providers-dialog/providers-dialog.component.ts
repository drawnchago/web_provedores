import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ShCatalogsService} from '../../sh-catalogs.service';
import { Provider ,Municipalities ,States} from './providers-dialog.model';
import { GeneralService } from 'src/app/shared/services/general.service';


@Component({
  selector: 'app-providers-dialog',
  templateUrl: './providers-dialog.component.html',
  styleUrls: ['./providers-dialog.component.scss']
})
export class ProvidersDialogComponent implements OnInit {
   
  public   form           : FormGroup;
  public   action         : string;
  public   provider       : Provider;
  public   municipalities : Municipalities;
  public   states         : States;
  public   name           : string;
  public   description    : string;
  public   status         : number;
  public   username       : string;
  public   user_id        : number;

  constructor(              
              public dialogRef       : MatDialogRef<ProvidersDialogComponent>,
              public fb              : FormBuilder,
              public services        : ShCatalogsService,
              public general_service : GeneralService,
              private toastr         : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
              {
              this.username  = AuthService.getUser().username;
              this.user_id   = AuthService.getUser().id;

              this.form = this.fb.group({
                state_id        : [null, Validators.required],
                municipality_id : [null, Validators.required],
                name            : [null, Validators.required],
                rfc             : [null, Validators.required],
                address         : [null, Validators.required],
                cp              : [null, Validators.required],
                phone           : [null, Validators.required],
                status          : null
              });

              this.load(data);
              }


  ngOnInit(): void {}

  save(){

    let state_id        = this.form.controls.state_id.value;
    let municipality_id = this.form.controls.municipality_id.value;
    let name            = this.form.controls.name.value;
    let rfc             = this.form.controls.rfc.value;
    let address         = this.form.controls.address.value;
    let cp              = this.form.controls.cp.value;
    let phone           = this.form.controls.phone.value;
    let status          = this.form.controls.status.value;

    if(name == null || rfc == null || address == null || cp == null || phone == null || status == null){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
            id              : this.provider.id,
            state_id        : state_id,
            municipality_id : municipality_id,
            name            : name,
            rfc             : rfc,
            address         : address,
            cp              : cp,
            phone           : phone,
            status          : status,
            user_id         : this.user_id
    }

    this.services.saveProvider(DATA).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.toastr.success(response['message']);
      this.closeDialog(response['success']);
    })

  }

  load(data){
    
    this.general_service.getStatesByType(0,2).subscribe(response=>{
      console.log('getState');
      console.log(response);
      this.states = response['states'];
      console.log('this.states');
      console.log(this.states);
    });

    this.general_service.getMunicipalitiesByType(0,2).subscribe(response=>{
      this.municipalities = response['municipalities'];
    });

    if(data){
      this.provider = {...data};
      this.action   = data.action;
      this.form.patchValue(this.provider);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

}
