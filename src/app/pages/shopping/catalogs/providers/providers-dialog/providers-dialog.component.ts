import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ShCatalogsService} from '../../sh-catalogs.service';
import { Provider ,Municipalities ,States} from './providers-dialog.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { CommercialBusiness } from '../../commercial_business/commercial-business.model';


@Component({
  selector: 'app-providers-dialog',
  templateUrl: './providers-dialog.component.html',
  styleUrls: ['./providers-dialog.component.scss']
})
export class ProvidersDialogComponent implements OnInit {
   
  public   form                : FormGroup;
  public   action              : string;
  public   provider            : Provider;
  public   municipalities      : Municipalities[];
  public   commercial_business : CommercialBusiness[]; 
  public   states              : States;
  public   name                : string;
  public   description         : string;
  public   status              : number;
  public   username            : string;
  public   user_id             : number;

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

                commercial_business_id : [null, Validators.required],
                name                   : [null, Validators.required],
                business_name          : [null, Validators.required],
                adress                 : [null, Validators.required],
                subrub                 : [null, Validators.required],
                state_id               : [null, Validators.required],
                municipality_id        : [null, Validators.required],
                telephone              : [null, Validators.required],
                contact_company        : [null, Validators.required],
                contact_payment        : [null, Validators.required],
                email                  : [null, Validators.required],
                rfc                    : [null, Validators.required],
                cp                     : [null, Validators.required],
                expense_account        : [null, Validators.required],
                expense_subaccount     : [null, Validators.required],
                fiscal_account         : [null, Validators.required],
                limit                  : [null, Validators.required],
                status                 : null
              });

              this.load(data);
              }


  ngOnInit(): void {
    this.services.getCommercialBusiness().subscribe(response=>{
      this.commercial_business = response['commercial_business'];
    })
  }

  save(){

    let commercial_business_id  = this.form.controls.commercial_business_id.value;
    let name                    = this.form.controls.name.value;
    let business_name           = this.form.controls.business_name.value;
    let adress                  = this.form.controls.adress.value;
    let subrub                  = this.form.controls.subrub.value;
    let state_id                = this.form.controls.state_id.value;
    let municipality_id         = this.form.controls.municipality_id.value;
    let telephone               = this.form.controls.telephone.value;
    let contact_company         = this.form.controls.contact_company.value;
    let contact_payment         = this.form.controls.contact_payment.value;
    let email                   = this.form.controls.email.value;
    let rfc                     = this.form.controls.rfc.value;
    let cp                      = this.form.controls.cp.value;
    let expense_account         = this.form.controls.expense_account.value;
    let expense_subaccount      = this.form.controls.expense_subaccount.value;
    let fiscal_account          = this.form.controls.fiscal_account.value;
    let limit                   = this.form.controls.limit.value;
    let status                  = this.form.controls.status.value;

    if(
      commercial_business_id == null ||
      name                   == ''   ||
      business_name          == ''   ||
      adress                 == ''   ||
      subrub                 == ''   ||
      state_id               == null ||
      municipality_id        == null ||
      telephone              == ''   ||
      contact_company        == null ||
      contact_payment        == null ||
      email                  == ''   ||
      rfc                    == ''   ||
      cp                     == null ||
      expense_account        == null ||
      expense_subaccount     == null ||
      fiscal_account         == null ||
      limit                  == null ||
      status                 == null
    ){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
            id                     : this.provider.id,
            commercial_business_id : commercial_business_id,
            name                   : name,
            business_name          : business_name,
            adress                 : adress,
            subrub                 : subrub,
            state_id               : state_id,
            municipality_id        : municipality_id,
            telephone              : telephone,
            contact_company        :contact_company,
            contact_payment        :contact_payment,
            email                  : email,
            rfc                    : rfc,
            cp                     : cp,
            expense_account        : expense_account,
            expense_subaccount     : expense_subaccount,
            fiscal_account         : fiscal_account,
            limit                  : limit,
            status                 : status,
            user_id                : this.user_id
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
  isNull(){
    let state_id :number = this.form.controls.state_id.value;

    if(state_id == null){
      this.toastr.error("Seleccione un estado");
    }

  }
  isNumber(evt,) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57)) || (charCode == 46 && evt.target.value.indexOf('.') != -1)) {
      return false;
    }
    return true;
  }

  getMunicipalities(){

    this.form.controls.municipality_id.setValue(null);
    let state_id :number = this.form.controls.state_id.value;
    let type     :number = 1;

    this.general_service.getMunicipalitiesByType(state_id,type).subscribe(response=>{
      this.municipalities = response['municipalities'];
    })
  }
  load(data){
    
    this.general_service.getStatesByType(0,2).subscribe(response=>{
      this.states = response['states'];
    });

    if(data){

      let state_id   : number = data.state_id;
      let type : number = 1;

      this.provider = {...data};
      this.action   = data.action;

      if(state_id){
        if(this.provider.municipality_id != null){
          this.general_service.getMunicipalitiesByType(state_id,type).subscribe(response=>{
            this.municipalities = response['municipalities'];
            if( this.municipalities.length > 0){
              this.form.controls.municipality_id.setValue(this.provider.municipality_id);
            }
          })
        }
      }

      this.form.patchValue(this.provider);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

}
