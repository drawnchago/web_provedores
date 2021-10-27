import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ShCatalogsService} from '../../sh-catalogs.service';
import { TypeOfProduct } from '../type-of-products-dialog/type-of-products-units-dialog.model';


@Component({
  selector: 'app-type-of-products-dialog',
  templateUrl: './type-of-products-dialog.component.html',
  styleUrls: ['./type-of-products-dialog.component.scss']
})
export class TypeOfProductsDialogComponent implements OnInit {

  public   form             : FormGroup;
  public   action           : string;
  public   type_of_product  : TypeOfProduct;
  public   name             : string;
  public   description      : string;
  public   status           : number;
  public   username         : string;
  public   user_id          : number;

  constructor(              
              public dialogRef : MatDialogRef<TypeOfProductsDialogComponent>,
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
            id          : this.type_of_product.id,
            description : description,
            status      : status,
            user_id      : this.user_id
    }

    this.service.saveTypeOfProduct(DATA).subscribe(response=>{

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
      this.type_of_product     = {...data};
      this.action              = data.action;
      this.form.patchValue(this.type_of_product);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

}
