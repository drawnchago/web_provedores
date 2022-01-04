import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { AdmonCatalogsService } from '../../admon-catalogs.service';
import { Customer ,KindOfPerson ,Bank ,Cfdi} from './customers-dialog.model';
import { Municipality } from '../../../../settings/catalogs/municipalities/municipalities.model';
import { State } from '../../../../settings/catalogs/states/states.model';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-customers-dialog',
  templateUrl: './customers-dialog.component.html',
  styleUrls: ['./customers-dialog.component.scss'],
  providers: [AdmonCatalogsService]
})
export class CustomersDialogComponent implements OnInit {

  public   form              : FormGroup;
  public   action            : string;
  public   customer          : Customer;
  public   name              : string;
  public   description       : string;
  public   status            : number;
  public   username          : string;
  public   user_id           : number;
  public   banks             : Bank[];
  public   kind_of_persons   : KindOfPerson[];
  public   municipalities    : Municipality[];
  public   states            : State[];
  public   cfdis              : Cfdi[];


  constructor(
              public dialogRef         : MatDialogRef<CustomersDialogComponent>,
              public fb                : FormBuilder,
              public general_service   : GeneralService,
              public service           : AdmonCatalogsService,
              private toastr           : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
               {

                this.username  = AuthService.getUser().username;
                this.user_id   = AuthService.getUser().id;

                this.form = this.fb.group({
                  name              :        [null, Validators.required],
                  description       :        [null, Validators.required],
                  adress            :        [null, Validators.required],
                  subrub            :        [null, Validators.required],
                  state_id          :        [null, Validators.required],
                  municipality_id   :        [null, Validators.required],
                  telephone         :        [null, Validators.required],
                  rfc               :        [null, Validators.required],
                  cp                :        [null, Validators.required],
                  cfdi_id           :        [null, Validators.required],
                  contact_purchase  :        [null, Validators.required],
                  contact_payments  :        [null, Validators.required],
                  bank_id           :        [null, Validators.required],
                  email             :        [null, Validators.required],
                  days              :        [null, Validators.required],
                  account_bank      :        [null, Validators.required],
                  kind_of_person_id :        [null, Validators.required],
                  credit_limit      :        [null, Validators.required],
                  status            :      null
                });

                this.load(data);
               }

               

  ngOnInit(): void {
    
    let id   : number = 0;
    let type : number = 1;

    this.general_service.getStatesByType(id,type).subscribe(response=>{
      this.states = response['states'];
    });

    this.service.getKindOfPersons().subscribe(response=>{
      this.kind_of_persons = response['kind_of_persons'];
    });

    this.service.getBanks().subscribe(response=>{
      this.banks = response['banks'];
    });
    this.service.getCfdi().subscribe(response=>{
      this.cfdis = response['cfdis'];
    });
  }

  save(){

    let name              = this.form.controls.name.value;
    let description       = this.form.controls.description.value;
    let adress            = this.form.controls.adress.value; 
    let subrub            = this.form.controls.subrub.value; 
    let state_id          = this.form.controls.state_id.value; 
    let municipality_id   = this.form.controls.municipality_id.value; 
    let telephone         = this.form.controls.telephone.value; 
    let rfc               = this.form.controls.rfc.value; 
    let cp                = this.form.controls.cp.value; 
    let cfdi_id           = this.form.controls.cfdi_id.value; 
    let contact_purchase  = this.form.controls.contact_purchase.value; 
    let contact_payments  = this.form.controls.contact_payments.value; 
    let bank_id           = this.form.controls.bank_id.value; 
    let email             = this.form.controls.email.value; 
    let days              = this.form.controls.days.value; 
    let account_bank      = this.form.controls.account_bank.value; 
    let kind_of_person_id = this.form.controls.kind_of_person_id.value; 
    let credit_limit      = this.form.controls.credit_limit.value; 
    let status            = this.form.controls.status.value;
    
    if( name              == ''   ||
        description       == ''   ||
        adress            == ''   ||
        subrub            == ''   ||
        state_id          == null ||
        municipality_id   == null ||
        telephone         == null ||
        rfc               == ''   ||
        cp                == null ||
        cfdi_id           == null ||
        contact_purchase  == ''   ||
        contact_payments  == ''   ||
        bank_id           == null ||
        email             == null ||
        days              == null ||
        account_bank      == null ||
        kind_of_person_id == null ||
        status            == null ||
        credit_limit      == null)
        {
        this.toastr.error('Los campos se encuentran nulos');
        return;
       }

    const DATA = {
            id                : this.customer.id,
            name              : name,
            description       : description,
            adress            : adress,
            subrub            : subrub,
            state_id          : state_id,
            municipality_id   : municipality_id,
            telephone         : telephone,
            rfc               : rfc,
            cp                : cp,
            cfdi_id           : cfdi_id,
            contact_purchase  : contact_purchase,
            contact_payments  : contact_payments,
            bank_id           : bank_id,
            email             : email,
            days              : days,
            account_bank      : account_bank,
            kind_of_person_id : kind_of_person_id,
            credit_limit      : credit_limit,
            status            : status,
            user_id           : this.user_id
    }

    this.service.saveCustomer(DATA).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
      }else{
        this.toastr.success(response['message']);
        this.closeDialog(response['success']);
      }
     
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
    if(data){
      let state_id   : number = data.state_id;
      let type : number = 1;

      this.customer     = {...data};
      this.action       = data.action;

      if(state_id != null){
        this.general_service.getMunicipalitiesByType(state_id,type).subscribe(response=>{
          this.municipalities = response['municipalities'];
          if( this.municipalities.length > 0){
            this.form.controls.municipality_id.setValue(this.customer.municipality_id);
          }
        });
      }

      this.form.patchValue(this.customer);
    }
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }
}
