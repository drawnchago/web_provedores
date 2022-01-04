import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService} from 'src/app/shared/services/auth.service';
import { ShProccessService} from '../../sh-process.service';
import { PurchaseRequistion ,PurchaseRequsition ,RequistionDetails  ,Areas ,Users ,Products ,Concept} from './purchase-requisitions-dialog.model';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralService } from 'src/app/shared/services/general.service';
import { RowHeightCache } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-purchase-requisitions-dialog',
  templateUrl: './purchase-requisitions-dialog.component.html',
  styleUrls: ['./purchase-requisitions-dialog.component.scss']
})
export class PurchaseRequisitionsDialogComponent implements OnInit {

  public   form                 : FormGroup;

  //STRING
  public   area                 : string;
  public   action               : string;
  public   name                 : string;
  public   description          : string;
  public   username             : string;

  //NUMBER
  public   id                   : number;
  public   index                : number;
  public   product_id           : number;
  public   position             : number;
  public   status               : number;
  public   user_id              : number;
  public   purchase_requisition : PurchaseRequistion;
  public   purchas_requsition   : PurchaseRequsition;

  //ARRAY
  public   areas                : Areas[];
  public   users                : Users[];
  public   products             : Products[];
  public   requistion_details   : RequistionDetails[];
  public   added_concepts       = new Array();

  //CLASS
  public  concept               : Concept;

  //BOOLEAN
  public  panelOpenState        : boolean;
  public  conceptsIsNull        : boolean;
  public  tableIsNull           : boolean;


  //MATTABLEDATASOURCE
  public dataSource             : MatTableDataSource<any>;
  displayedColumns = ['code','description','price','quantity','subtotal','action'];

  constructor(              
              public dialogRef       : MatDialogRef<PurchaseRequisitionsDialogComponent>,
              public fb              : FormBuilder,
              public service         : ShProccessService,
              public generalServices : GeneralService,
              private toastr         : ToastrService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
              {
              this.panelOpenState = false;
              this.tableIsNull    = false;
              this.index          = 0;
              this.position       = 1;
              this.username       = AuthService.getUser().username;
              this.user_id        = AuthService.getUser().id;

              this.form = this.fb.group({
                search               : [null, Validators.required],
                area_id              : [null, Validators.required],
                status               : [null, Validators.required],
                requisition_comments : [null, Validators.required],
                product_id           : [null, Validators.required],
                code                 : [null, Validators.required],
                description          : [null, Validators.required], 
                quantity             : [null, Validators.required],
                price                : [null, Validators.required],
                comment              : [null, Validators.required],
              });

              this.load(data);
              }


  ngOnInit(): void {
  }

  save(){

    let area_id               = this.form.controls.area_id.value;
    let status                = this.form.controls.status.value;
    let code                  = this.form.controls.code.value;
    let description           = this.form.controls.description.value;
    let quantity              = this.form.controls.quantity.value;
    let price                 = this.form.controls.price.value;
    let requisition_comments  = this.form.controls.requisition_comments.value;

    if(area_id == null || status == null  || requisition_comments == null ){
        this.toastr.error('Los campos se encuentran nulos');
        return;
    }

    const DATA = {
        id                   : this.id ? this.id : null,
        area_id              : area_id,
        status               : status,
        code                 : code,
        description          : description,
        quantity             : quantity,
        price                : price,
        requisition_comments : requisition_comments,
        added_concepts       : this.added_concepts,
        user_id              : this.user_id 
    }

    console.log("DATA");
    console.log(DATA);

    this.service.savePurchaseRequsitiont(DATA).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.toastr.success(response['message']);
      this.closeDialog(response['success']);
    })

  }

  applyFilter(filterValue){

  }

  openDialog(a, o){

  }
  getArea(area){
    this.area = area.description;
  }
  isNumber(e){
    e = (e) ? e : window.event;
    var charCode = (e.which) ? e.which : e.keyCode;

    if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57)) || (charCode == 46 && e.target.value.indexOf('.') != -1)) {
        return false;
    }

    return true;
  }

  onTabChanged(e){
    this.index = e.index;
  }

  nextMatTab(){
    this.index++;

    if(this.index > 2){
      this.index = 0;
    }

  }

  previousMatTab(){
    this.index--;

    if(this.index < 0 ){
      this.index = 0;
    }

  }
  selectionElement(product){

    let element     = null;
    this.product_id = product.id;

    element = this.products.find(x => x.id == product.id);

    this.form.controls.code.setValue(element.code);
    this.form.controls.description.setValue(element.description);
    // this.form.controls.price.setValue(element.unit_price);
  }

  filterProduct(){
    let search  = this.form.controls.search.value;

    let id          = null;
    let type        = 3;
    let description = null;

    description = search.toLowerCase();
    
    this.generalServices.getProductsByType(id,type,description).subscribe(response=>{
      this.products = response['products'];
    });
  }

  saveElement(){
    let id                 = null;
    let concept            = null;
    let subtotal           = null;

    let product_id         = this.product_id ? this.product_id : null;
    let position           = this.position++;
    let code               = this.form.controls.code.value;
    let description        = this.form.controls.description.value;
    let price              = this.form.controls.price.value;
    let quantity           = this.form.controls.quantity.value;
    let comment            = this.form.controls.comment.value;
    let message            = "Los campos se encuentran vacios"; 

    if(code == null || description == null || comment == null || quantity == null || price == null){
      this.toastr.error(message);
      return;
    }

    description = comment ? (description + '\n' + comment) : description;
    subtotal    = Number(price) * Number(quantity)
    concept     = new Concept(id,product_id,position,code,description,price,quantity,subtotal);

    this.added_concepts.push(concept);
    this.toastr.success("Se agrego concepto");
    this.tableIsNull    = this.added_concepts.length > 0 ? false : true;
    this.dataSource     = new MatTableDataSource(this.added_concepts);
    this.conceptsIsNull = true;
  }

  deleteElement(element){
    let position    : number;

    position        = element.position;

    this.added_concepts.splice(this.added_concepts.findIndex((element,index) =>{if ( element.position == position){return index;}}),1);
    this.tableIsNull = this.added_concepts.length > 0 ? false : true;
    this.toastr.success("Se eliminó registro");
    this.dataSource = new MatTableDataSource(this.added_concepts);
  }

  closeDialog(success):void{
    this.dialogRef.close(success);
  }

  load(data){

    let id;
    let type        = 2;
    let description = null;

    this.generalServices.getAreasByType(id,type).subscribe(response=>{
      this.areas = response['areas'];
    });

    this.generalServices.getProductsByType(id,type,description).subscribe(response=>{
      this.products = response['products'];
    });

    // this.generalServices.getUsersByType(id,type).subscribe(response=>{
    //   console.log('getUsersByType');
    //   console.log(response);
    //   this.users = response['users'];
    // });

    if(data){

      this.purchase_requisition = {...data};

      this.service.getRequisitionDetails(data.id,data.area_id).subscribe(response=>{
        this.id                 = data.id;
        this.requistion_details = response['requistion_details'];
        if(this.requistion_details.length > 0){

          this.requistion_details.map(x=>{
            this.position   = this.position++;
            let concept     = new Concept(x.id,x.product_id,this.position,null,x.desc_product,x.unit_price,x.quantity,x.subtotal);
            this.added_concepts.push(concept);
          });
        }

        this.tableIsNull      = this.added_concepts.length > 0 ? false : true;
        this.dataSource       = new MatTableDataSource(this.added_concepts);
      });

      this.action               = data.action;
      this.form.patchValue(this.purchase_requisition);
      this.form.controls.requisition_comments.setValue(this.purchase_requisition['comments']);
    }
  }
}
