import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ShCatalogsService} from '../../sh-catalogs.service';
import { Product , Classifications,  TypeOfProducts, MeasurementUnits} from '../products-dialog/products-dialog.model';


@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  public   form              : FormGroup;
  public   action            : string;
  public   product           : Product;
  public   classifications   : Classifications[];
  public   type_of_products  : TypeOfProducts[];
  public   measurement_units : MeasurementUnits[];
  public   name              : string;
  public   description       : string;
  public   status            : number;
  public   username          : string;
  public   user_id           : number;

  constructor(              
              public dialogRef : MatDialogRef<ProductDialogComponent>,
              public fb        : FormBuilder,
              public service   : ShCatalogsService,
              private toastr   : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
              {
                this.username = AuthService.getUser().username;
                this.user_id   = AuthService.getUser().id;

                this.form = this.fb.group({
                    measurement_unit_id : [null, Validators.required],
                    type_product_id     : [null, Validators.required],
                    classification_id   : [null, Validators.required],
                    description         : [null, Validators.required],
                    status              : null
                });

                this.load(data);
              }


  ngOnInit(): void {
  }

  save(){
    
    let measurement_unit_id  = this.form.controls.measurement_unit_id.value;
    let type_product_id      = this.form.controls.type_product_id.value;
    let classification_id    = this.form.controls.classification_id.value;
    let description          = this.form.controls.description.value;
    let status               = this.form.controls.status.value;


    if(name == null || description == null || status == null){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
            id                  : this.product.id,
            measurement_unit_id : measurement_unit_id,
            type_product_id     : type_product_id,
            classification_id   : classification_id,
            description         : description,
            status              : status,
            user_id             : this.user_id
    }

    this.service.saveProduct(DATA).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.toastr.success(response['message']);
      this.closeDialog(response['success']);
    })

  }

  load(data){

    this.service.getClassifications().subscribe(response=>{
      this.classifications = response['classifications'];
    });

    this.service.getMeasurementUnits().subscribe(response=>{
      this.measurement_units = response['measurement_units'];
    });

    this.service.getTypeOfProducts().subscribe(response=>{
      this.type_of_products = response['type_of_products'];
    });

    if(data){

      this.product      = {...data};
      this.action       = data.action;
      this.form.patchValue(this.product);
      }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

}
