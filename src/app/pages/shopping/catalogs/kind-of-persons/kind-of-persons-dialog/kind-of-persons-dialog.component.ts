import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ShCatalogsService} from '../../sh-catalogs.service';
import { KindOfPerson } from './kind-of-persons-dialog.model';


@Component({
  selector: 'app-kind-of-persons-dialog',
  templateUrl: './kind-of-persons-dialog.component.html',
  styleUrls: ['./kind-of-persons-dialog.component.scss']
})
export class KindOfPersonDialogComponent implements OnInit {

  public form           : FormGroup;
  public action         : string;
  public kind_of_person : KindOfPerson;
  public name           : string;
  public description    : string;
  public status         : number;
  public username       : string;
  public user_id        : number;

  constructor(              
              public dialogRef : MatDialogRef<KindOfPersonDialogComponent>,
              public fb        : FormBuilder,
              public service   : ShCatalogsService,
              private toastr   : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
              {
              this.username = AuthService.getUser().username;
              this.user_id   = AuthService.getUser().id;

              this.form = this.fb.group({
                  name        : [null, Validators.required],
                  description : [null, Validators.required],
                  status      : null
              });

              this.load(data);
              }


  ngOnInit(): void {
  }

  save(){

    let name        = this.form.controls.name.value;
    let description = this.form.controls.description.value;
    let status      = this.form.controls.status.value;

    if(description == '' || name == '' || status == null){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
            id          : this.kind_of_person.id,
            name        : name,
            description : description,
            status      : status,
            user_id     : this.user_id
    }

    this.service.saveKindOfPerson(DATA).subscribe(response=>{

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
      this.kind_of_person     = {...data};
      this.action   = data.action;
      this.form.patchValue(this.kind_of_person);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

}
