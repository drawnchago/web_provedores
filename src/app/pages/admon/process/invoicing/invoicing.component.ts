import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { InvoicingService } from './invoicing.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.scss']
})
export class InvoicingComponent implements OnInit {

  woOrders: any[] = [];
  woOrdersToInvoice: any[] = [];
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  isBlocked: boolean = false;
  displayedColumns = ['#', 'type_bomb', 'customer', 'brand', 'model', 'total', 'created_at', 'action'];
  displayedDetColumns = ['id','product_key','concept','unit_price','iva','total'];
  displayedTotalColumns = ['concept','amount','currency'];
  allComplete: boolean = false;
  filterForm: FormGroup;
  subtotal: number;
  iva: number;
  total: number;
  totals: any[];
  customer_info: any;
  public formStamp: FormGroup;
  public dataSource: MatTableDataSource<any>;
  public dataSourceDetail: MatTableDataSource<any>;
  public dataSourceTotal: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor( public fb: FormBuilder,
    public toastr: ToastrService,
    private invoicingService: InvoicingService) { 

    this.filterForm = this.fb.group({
      startDate: null,
      endDate: null,
      status: 1,
    });

    this.invoicingService.getWorkOrders(moment('2021-09-01').format('YYYY-MM-DD'), moment('2021-09-30').format('YYYY-MM-DD'), 0).subscribe(result => {
      console.log(result);
      this.woOrders = result.data;
      this.dataSource = new MatTableDataSource(this.woOrders);
      this.dataSource.sort = this.sort;
    });    

    this.formStamp = this.fb.group({
      customer: ['', [Validators.required, this.noWhitespaceValidator]],
      rfc: ['', [Validators.required, this.noWhitespaceValidator]],
      payment_method: ['PUE', Validators.required],
      cfdi: ['G03', Validators.required],
      payment_way: ['01', Validators.required],
      digits: ['xxxx'],
      conditions: ['CONTADO'],
    });

    this.initDataSourceDetail();
  }

  ngOnInit(): void {
  }

  filter(filterValue){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  someComplete() {
    //return this.invoiceList.data.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  refresh(){
    let startDate = this.filterForm.controls.startDate.value;
    let endDate = this.filterForm.controls.endDate.value;

    if(startDate > endDate){
      this.toastr.error('Fecha inicio no puede ser mayor que Fecha fin');
      this.filterForm.controls.endDate.setValue(null);
      return;
    }

    this.invoicingService.getWorkOrders(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 0).subscribe(result => {
      console.log(result);
    });

  }

  initDataSourceDetail(){
    this.dataSourceDetail = new MatTableDataSource(this.woOrdersToInvoice);
    this.dataSourceDetail.sort = this.sort;
  }

  changeSelectionElement(element, event){
    let bit = event.target.checked;

    if(bit){
      let wo = this.woOrdersToInvoice.find(x => x.customer_id != element.customer_id);
      if(wo){
        this.toastr.error('Las ordenes a facturar deben pertenecer al mismo cliente');
        event.target.checked = false;
        return;
      }
      
      element.selected = bit;
      this.woOrdersToInvoice.push(element);
      
    }else{
      this.woOrdersToInvoice = this.woOrdersToInvoice.filter(x => x != element);
    }

    this.step1 = this.woOrdersToInvoice.length > 0 ? true : false;
    console.log(this.woOrdersToInvoice);
    //this.setp2 = this.woOrdersToInvoice.length > 0 ? true : false;

    this.calculeTotals();
  }

  calculeTotals(){
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    this.woOrdersToInvoice.forEach(e => {
      this.subtotal += Number(e.subtotal);
      this.iva += Number(e.iva)
    });
    this.total = this.subtotal + this.iva;
    this.dataSourceDetail.data = this.woOrdersToInvoice;
    this.setTotals();
  }

  setTotals(){
    this.totals = [];
    this.totals.push({concept:'Subtotal', amount: this.subtotal, currency: 'MXN'});
    this.totals.push({concept:'IVA', amount: this.iva, currency: 'MXN'});
    this.totals.push({concept:'Total', amount: this.total, currency: 'MXN'});
    this.dataSourceTotal = new MatTableDataSource(this.totals);
  }

  selectionChange(event: StepperSelectionEvent) {
    let stepLabel = event.selectedStep.label
    if (stepLabel == "VERIFICA EL DETALLE") {
      this.customer_info = {name: this.woOrdersToInvoice[0].customer, rfc: this.woOrdersToInvoice[0].rfc};
      this.formStamp.controls.customer.setValue(this.customer_info.name);
      this.formStamp.controls.rfc.setValue(this.customer_info.rfc);
      this.step2 = true;
    }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}
