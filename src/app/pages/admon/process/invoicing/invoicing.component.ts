import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { InvoicingService } from './invoicing.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { User } from 'src/app/shared/Interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
declare var require: any

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
  user: User;
  pgPreviewHidden: boolean = true;
  pgStampHidden: boolean = true;
  stampDisabled: boolean = false;
  displayedColumns = ['#', 'type_bomb', 'customer', 'brand', 'model', 'amount', 'created_at', 'action'];
  displayedDetColumns = ['id','product_key','concept','unit_price','iva','amount'];
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

    this.invoicingService.getWorkOrders(moment('2021-09-01').format('YYYY-MM-DD'), moment('2022-09-30').format('YYYY-MM-DD'), 0).subscribe(result => {
      console.log(result);
      this.woOrders = result.data;
      this.dataSource = new MatTableDataSource(this.woOrders);
      this.dataSource.sort = this.sort;
    });    

    this.formStamp = this.fb.group({
      customer: ['', [Validators.required, this.noWhitespaceValidator]],
      customer_id: ['', [Validators.required]],
      rfc: ['', [Validators.required, this.noWhitespaceValidator]],
      payment_method: ['PUE', Validators.required],
      cfdi: ['G03', Validators.required],
      payment_way: ['99', Validators.required],
      digits: ['xxxx'],
      payment_conditions: ['CONTADO'],
      retentions: [false, Validators.required]
    });

    this.user = AuthService.getUser();

    this.initDataSourceDetail();
    //this.createPDF();
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
      this.customer_info = {name: this.woOrdersToInvoice[0].customer, rfc: this.woOrdersToInvoice[0].rfc, id: this.woOrdersToInvoice[0].customer_id};
      this.formStamp.controls.customer.setValue(this.customer_info.name);
      this.formStamp.controls.customer_id.setValue(this.customer_info.id);
      this.formStamp.controls.rfc.setValue(this.customer_info.rfc);
      this.step2 = true;
    }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  stamp(preview: boolean){
    let data = this.formStamp.value;
    data.work_orders = this.woOrdersToInvoice;
    data.preview = preview;
    data.user_id = this.user.id;
    var _this = this;

    this.pgStampHidden = false;
    setTimeout(function(){
      _this.pgStampHidden = true;
      _this.createPDF(1);
    },400);

    /*this.invoicingService.stamp(data).subscribe(result => {
      console.log(result);
      if(result.success){
        this.stampDisabled = true;
        this.pgStampHidden = true;
        this.createPDF(result.invoice.id);
      }else{
        this.toastr.error('Ocurrió un erorr al intentar generar la factura');
      }
    });*/
  }

  createPDF(invoice_id){
    this.invoicingService.getXML(invoice_id).subscribe(result => {
      if(result.success){
        let invoice = result.invoice;
        var xmlStr = atob(result.xml_base64);
        let doc = new jsPDF('p','mm','a4');

        var urlImage = new Image();
        var urlImageSAT = new Image();
        urlImage.src = '../assets/images/bovisa.png';
        urlImageSAT.src = '../assets/images/LogoSAT.jpg';
        var space_y = 3;
        
        doc.roundedRect(10,5,90,20,3,3); //Rect Logo
        doc.roundedRect(10,28,90,37,3,3); //Rect Emisor
        doc.roundedRect(105,5,95,60,3,3); //Rect Factura y= 65
        doc.roundedRect(10,68,190,15,3,3); //Rect Receptor

        doc.setFontSize(11);
        doc.setFont('helvetica','','bold');
        doc.setTextColor(0,100,0); //Color Verde
        doc.addImage(urlImage,'PNG',12,7, 85,17);
        doc.addImage(urlImageSAT,'JPG',165,27, 30,20);
        doc.text('EMISOR:',12,33);
        doc.text('RECEPTOR:',12,73);
        doc.text('FACTURA.',107,10);
        doc.text('CONCEPTOS:',10,90);
        
        doc.setTextColor(0,0,0);
        doc.setFontSize(10);
        doc.text("RFC:",12,50);
        doc.text("RFC:",12,81);
        doc.text("USO CFDI:",85,81);
        doc.text("FOLIO Y SERIE:",145,12);
        doc.setFontSize(9);
        doc.text("LUGAR DE EXPEDICIÓN (CÓDIGO POSTAL):",12,60);
        doc.text("FOLIO FISCAL: ",107,18);
        doc.text("CERTIFICADO SAT: ",107,27);
        doc.text("CERTIFICADO DEL EMISOR: ",107,36);
        doc.text("FECHA HORA DE EMISIÓN: ",107,45);
        doc.text("FECHA HORA DE CERTIFICACIÓN: ",107,54);
        doc.text("RÉGIMEN FISCAL: ",107,62);

        doc.setFontSize(27);
        doc.setTextColor(192,192,192); //Color gris
        doc.setFont('helvetica','','italic');
        doc.text("CFDI 3.3",153,79);

        let parseString = require('xml2js').parseString;
        let y: number = 0;
        parseString(xmlStr, function(err, result){
          console.log(result);
          var totalIVA, totalIVARet, subTotal, total, discount;
          var paymentWay, paymentMethod, cfdi, originalString = '';
          var concepts = [];
          y = 0;

          var voucher = result['cfdi:Comprobante']; //Comprobante
          var digitalStamp = voucher['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$; //Timbre Digital
          var issuing = voucher['cfdi:Emisor'][0].$;
          var receiver = voucher['cfdi:Receptor'][0].$;
          var taxes = voucher['cfdi:Impuestos'][0];
          var invoiceConcepts = voucher['cfdi:Conceptos'][0]['cfdi:Concepto'];

          subTotal = voucher.$.SubTotal;
          total = voucher.$.Total;
          discount = voucher.$.Descuento;
          
          if(taxes['cfdi:Traslados'] != undefined){
            totalIVA = taxes['cfdi:Traslados'][0]['cfdi:Traslado'][0].$.Impuesto == '002' ? taxes['cfdi:Traslados'][0]['cfdi:Traslado'][0].$.Importe : 0;
          }
          if(taxes['cfdi:Retenciones'] != undefined){
            totalIVARet = taxes['cfdi:Retenciones'][0]['cfdi:Retencion'][0]?.$.Impuesto == '002' ? taxes['cfdi:Retenciones'][0]['cfdi:Retencion'][0].$.Importe : 0;
          };

          invoiceConcepts.forEach(c => {
            c.$.Importe = '$' + parseFloat(c.$.Importe).toFixed(2);
            c.$.ValorUnitario = '$' + parseFloat(c.$.ValorUnitario).toFixed(2);
            concepts.push(c.$);
          });

          doc.setFontSize(10);
          doc.setFont('helvetica','','normal');
          doc.setTextColor(0,56,107); //Color azul
          //EMISOR
          doc.text(issuing.Nombre,16,38);
          doc.text(issuing.Rfc,22,50);
          doc.text(voucher.$.LugarExpedicion,82,60);

          //RECEPTOR
          doc.text(receiver.Nombre,16,77);
          doc.text(receiver.Rfc,22,81);
          doc.text(receiver.UsoCFDI,105,81);

          //FACTURA
          doc.text(digitalStamp.UUID,112,22);
          doc.text(digitalStamp.NoCertificadoSAT,112,31);
          doc.text(voucher.$.NoCertificado,112,40);
          doc.text(invoice.stamp_date,112,49);
          doc.text(digitalStamp.FechaTimbrado,112,58);
          doc.text(issuing.RegimenFiscal,137,62);

          doc.setTextColor(139,0,0) //Color rojo
          doc.setFontSize(11);
          doc.text(voucher.$.Serie + voucher.$.Folio,173,12);


          //Conceptos
          let columns = [
            {title: "ClaProServ", dataKey: "ClaveProdServ"},
            {title: "ClaUni", dataKey: "ClaveUnidad"},
            {title: "Cant", dataKey: "Cantidad"},
            {title: "Unidad", dataKey: "Unidad"},
            {title: "Descripción", dataKey: "Descripcion"},
            {title: "P/U", dataKey: "ValorUnitario"},
            {title: "Importe", dataKey: "Importe"},
          ];

          const autoTable = 'autoTable'; 
          doc[autoTable](columns, concepts,
            { headStyles: {
              fillColor: [255,255,255],
              textColor: [0,0,0]
              
            },columnStyles: { 
              ClaveProdServ: { 
                cellWidth: 23, fontSize: 7, textColor:[139,0,0] 
              },
              ClaveUnidad: { 
                cellWidth: 15, fontSize: 7, textColor:[139,0,0]
              },
              Cantidad: { 
                cellWidth: 11,fontSize: 7, textColor:[0,56,107]
              },
              Unidad: { 
                cellWidth: 18, fontSize: 7, textColor:[0,56,107]
              },
              Descripcion: { 
                cellWidth: 80, fontSize: 7, textColor:[0,56,107] 
              },
              ValorUnitario: { 
                cellWidth: 18, fontSize: 7, textColor:[0,56,107] 
              }, 
              Importe: { 
                cellWidth: 25, fontSize: 7, textColor:[0,56,107], halign: 'right'
              } 
            }, 
            startY: 93, 
            margin: {
              horizontal: 10
            } 
          });

          y = Math.round(doc['lastAutoTable'].finalY) + 10;
          console.log(y);
          if(y > 270){
            doc.addPage();
            y = 10;
          }

          doc.setFontSize(8);
          doc.setFont('helvetica','','bold');
          doc.setTextColor(0,0,0);
          doc.text("Total con letra:", 10, y);
          doc.text("Subtotal:", 170, y,{ align: 'right' });
          doc.text("Descuento:", 170, y+5, { align: 'right' });
          doc.text("IVA:", 170, y+10, { align: 'right' });
          doc.text("Forma de pago:", 10, y+10);
          if(parseFloat(totalIVARet) > 0){
            doc.text("Retención IVA:", 170, y+15, { align: 'right' });
            doc.text("Total:", 170, y+20, { align: 'right' });
          }else{
            doc.text("Total:", 170, y+15, { align: 'right' });
          }
          doc.text("Método de pago:", 10, y+15);

          doc.setFont('helvetica','','normal');
          doc.text("(NOVECIENTOS NOVENTA Y CUATRO PESOS 40/100 M. N.)", 10, y+5);
          doc.text('$' + subTotal,200,y, { align: 'right'});
          doc.text('$' + discount,200,y+5, { align: 'right'});
          doc.text('$' + totalIVA,200,y+10, { align: 'right'});
          if(parseFloat(totalIVARet) > 0){
            doc.text('$' + totalIVARet, 200,y+15, { align: 'right' });
            doc.text('$' + total, 200,y+20, { align: 'right' });
          }else{
            doc.text('$' + total, 200,y+15, { align: 'right' });
          }
          doc.text(voucher.$.FormaPago,40,y+10);
          doc.text(voucher.$.MetodoPago,40,y+15);
          
          originalString = '||' + digitalStamp.UUID + '|' + digitalStamp.FechaTimbrado + '|' + digitalStamp.SelloCFD + '|' + voucher.$.NoCertificado + '||';
         
          //var pageH = doc.internal.pageSize.height;
          if(y > 187){
            doc.addPage();
            y = 10;
          }else{
            y = 210;
          }
          doc.setFont('helvetica','','bold');
          doc.setFontSize(11);
          doc.setTextColor(0,100,0); //Color Verde
          doc.text("OBSERVACIONES:",8,y);
          
          doc.setTextColor(0,0,0);
          doc.setFontSize(8);
          doc.text("Sello digital del CFDI:", 10, y+15);
          doc.text("Sello del SAT:", 42, y+30);
          doc.text("Cadena original del complemento de certificación digital del SAT:", 42, y+48);
          
          doc.setFontSize(10);
          doc.text("===== Este documento es una representación impresa de un CFDI =====",105,y+68,{align: 'center'});
          doc.setFontSize(14);
          doc.setTextColor(192,192,192); //Color gris
          doc.setFont('helvetica','','normal');
          doc.text("www.bovisa.com.mx",105,y+75,{align: 'center'});
          doc.setTextColor(0,0,0);

          doc.setFontSize(10);
          var comments = doc.splitTextToSize(invoice.comments,190);
          doc.text(comments,10,y+5);
          doc.setFontSize(7);
          doc.setTextColor(0,56,107)//
          var seal = doc.splitTextToSize(digitalStamp.SelloCFD,190);
          doc.text(seal, 10, y+19);
          var sealSat = doc.splitTextToSize(digitalStamp.SelloSAT,155);
          doc.text(sealSat,42,y+34);
          originalString = doc.splitTextToSize(originalString,155);
          doc.text(originalString,42,y+52);
          
          
        });

        doc.save('factura.pdf');

      }

      
    })
  }

}
