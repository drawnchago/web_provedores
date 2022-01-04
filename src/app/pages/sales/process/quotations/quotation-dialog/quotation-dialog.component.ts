import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { quantity } from 'chartist';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/pages/admon/catalogs/customers/customers-dialog/customers-dialog.model';
import { Customers } from 'src/app/pages/admon/catalogs/customers/customers.model';
import { BranchOffice } from 'src/app/shared/components/create-pdf/create-pdf.model';
import { Quotation } from 'src/app/shared/Interfaces/quotation';
import { User } from 'src/app/shared/Interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { QuotationsComponent } from '../quotations.component';
import * as moment from 'moment';
import { SalesProcessService } from '../../sales-process.service';
import 'jspdf-autotable';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-quotation-dialog',
  templateUrl: './quotation-dialog.component.html',
  styleUrls: ['./quotation-dialog.component.scss'],
  providers: [GeneralService, SalesProcessService]
})
export class QuotationDialogComponent implements OnInit {

  user: User;
  quotation: Quotation;
  action: string;
  form: FormGroup;
  branchOffices: BranchOffice;
  customers: Customer[];
  concepts: any[];
  fcKeyConcept: FormControl;
  fcUnitConcept: FormControl;
  fcQuantityConcept: FormControl;
  fcUnitPriceConcept: FormControl;
  fcDescriptionConcept: FormControl;
  import: number = 0;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  discount: number = 0;
  tasaIVA: number = 0;
  edit_quotation: boolean = false;
  saveDisabled = false;
  urlImage = new Image();
  orders: any[];

  constructor(
    private dialogRef: MatDialogRef<QuotationsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private salesProcessService: SalesProcessService,
    private toastr: ToastrService
  ) {
    this.user = AuthService.getUser();
    this.quotation = data.quotation;
    this.action = data.action;

    this.concepts = [];

    this.form = this.fb.group({
      id: this.quotation ? this.quotation.id : null,
      created: this.quotation ? this.quotation.created : this.user.name,
      created_by: this.user.id,
      updated_by: this.user.id,
      updated_at: this.quotation ? this.quotation.updated_at : moment(),
      branch_office_id: 1,
      order_ids: null,
      customer_id: [this.quotation ? this.quotation.customer.id : null, Validators.required],
      customer_name: [this.quotation ? this.quotation.customer.name : null, Validators.required],
      customer_rfc: this.quotation ? this.quotation.customer.rfc : null,
      contact: [null, Validators.required],
      email: [null, Validators.required],
      telephone: [null, [Validators.required, Validators.minLength(10)]],
      comments: null,
      exchange: 'MXN',
      discount: 0,
      discount_p: 0,
      import: null,
      subtotal: null,
      iva: null,
      total: null
    });

    if (this.quotation) {
      this.edit_quotation = true;
      this.form.patchValue(this.quotation);
      this.concepts = this.quotation.concepts;
      this.setFormattedNumbers(this.quotation.import, this.quotation.discount, this.quotation.subtotal, this.quotation.iva, this.quotation.total);
      this.getOrders(this.quotation.customer.id);
    } else {
      this.salesProcessService.getLastFolioQuotation().subscribe(result => {
        this.form.controls.id.setValue(result.id);
      });
    }

    /*this.fcKeyConcept = new FormControl('XXXXX');
    this.fcUnitConcept = new FormControl('E48');
    this.fcQuantityConcept = new FormControl(2);
    this.fcUnitPriceConcept = new FormControl(150);
    this.fcDescriptionConcept = new FormControl('Reparación de bomba hidraulica');*/
    this.fcKeyConcept = new FormControl(null);
    this.fcUnitConcept = new FormControl(null);
    this.fcQuantityConcept = new FormControl(null);
    this.fcUnitPriceConcept = new FormControl(null);
    this.fcDescriptionConcept = new FormControl(null);

    this.generalService.getBranchOffices().subscribe(result => {
      if (result.success) {
        this.branchOffices = result.info;
      } else {
        this.toastr.error(result.message);
      }
    });

    this.generalService.getCustomersActives().subscribe(result => {
      if (result.success) {
        this.customers = result.customers;
      } else {
        this.toastr.error(result.message);
      }
    });

    this.generalService.getTasaIva().subscribe(result => {
      this.tasaIVA = result.info;
    });

  }

  ngOnInit(): void {
  }

  setValueForm() {

  }

  save() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      if (this.form.controls.customer_id.value == null && !this.isEmpty(this.form.controls.customer_name.value)) {
        this.toastr.error('Ingrese un cliente válido');
        return;
      }
      else {
        this.toastr.error('Favor de llenar los campos marcados como obligatorios');
        return;
      }
    }
    if (this.concepts.length == 0) {
      this.toastr.error('No hay conceptos para guardar');
    }

    this.quotation = this.form.value;
    this.quotation.id = this.edit_quotation ? this.quotation.id : null; //Si es nueva, se setea a nulo para insertar en backend, de lo contrario, actualiza
    this.quotation.concepts = this.concepts;

    this.quotation = this.removeCommas(this.quotation);
    this.saveDisabled = true;
    this.salesProcessService.saveQuotation(this.quotation).subscribe(result => {
      console.log(result);
      this.saveDisabled = false;
      if (result.success) {
        this.toastr.success(result.message);
        this.quotation = result.quotation;
        this.createPDF();
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  createPDF() {

    var fillColor = [25, 118, 210];
    let doc = new jsPDF('p', 'mm', 'a4');

    this.urlImage.src = 'assets/images/bovisa.png';

    doc.addImage(this.urlImage, 'PNG', 10, 5,40,20);
    doc.setFontSize(10);
    doc.setTextColor(25, 118, 210);
    //doc.text('Ejemplo', 25, 32);
    doc.text('BOMBAS VILLASANA S.A. DE C.V', 50, 10);
    doc.text('RFCBOVISA', 50, 14);
    doc.setFontSize(7);
    doc.text('LUCIO BLANCO ', 50, 17);
    doc.text('LEANDRO VALLE', 50, 20);
    doc.text('MONCLOVA, COAHUILA', 50, 23);
    doc.text('CP. 64370', 50, 26);
    doc.setFontSize(15);
    doc.text("Cotización", 160, 18);
    doc.setFontSize(20);
    doc.text(window.location.hash = String(this.quotation.id), 174, 26);
    doc.setFontSize(15);
    doc.text("Folio:", 158, 25);
    doc.setFontSize(10);
    doc.text(moment(this.quotation.updated_at).locale('es').format('DD [de] MMMM [del] YYYY'), 157, 32);
    doc.setDrawColor(192, 192, 192);
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    doc.rect(10, 40, 190, 2, 'F');
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    doc.rect(10, 40, 190, 2, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica')
    doc.text("Cotizado a :", 15, 48);
    doc.setFontSize(12);
    doc.text(this.quotation.customer.name, 15, 53);
    doc.setDrawColor(192, 192, 192)
    doc.setFontSize(8);
    doc.text("Contacto:" + " " + this.quotation.contact, 15, 57);
    doc.text("RFC:" + " " + (this.quotation.customer.rfc ? this.quotation.customer.rfc : ''), 15, 61);
    doc.text("Tels:" + " " + this.quotation.telephone, 15, 65);
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    doc.rect(10, 67, 190, 2, 'F');
    doc.setTextColor(0, 0, 0);

    let columns = [
      { title: "Código", dataKey: "code" },
      { title: "Descripción", dataKey: "description" },
      { title: "Unidad", dataKey: "unit" },
      { title: "Cant.", dataKey: "quantity" },
      { title: "PU", dataKey: "unit_price" },
      { title: "Importe", dataKey: "import" },
    ];

    let concepts: any = this.quotation.concepts;
    concepts.map(element => {
      element.description = element.description
      element.unit_price = '$' + this.numberWithCommas(element.unit_price);
      element.import = '$' + this.numberWithCommas(element.import);
    });

    const autoTable = 'autoTable';
    doc[autoTable](columns, concepts, { headStyles: { fillColor: [fillColor[0], fillColor[1], fillColor[2]] }, columnStyles: { code: { cellWidth: 31, fontSize: 8 }, description: { cellWidth: 80, fontSize: 8 }, unit: { cellWidth: 21, fontSize: 8 }, quantity: { cellWidth: 12, fontSize: 8 }, unit_price: { cellWidth: 20, fontSize: 8 }, subtotal: { cellWidth: 25, fontSize: 8 } }, startY: 70, margin: { horizontal: 10 } });

    let total_columna = [
      { title: "Concepto", dataKey: "descripcion" },
      { title: "Monto", dataKey: "monto" },
      { title: "Tipo", dataKey: "tipo" },
    ];

    let rows = [
      { "descripcion": "Importe", "monto": "$" + this.numberWithCommas(this.quotation.import.toFixed(2)), "tipo": "M.N." },
      { "descripcion": "Descuento", "monto": "$" + this.numberWithCommas(this.quotation.discount.toFixed(2)), "tipo": "M.N." },
      { "descripcion": "Subtotal", "monto": "$" + this.numberWithCommas(this.quotation.subtotal.toFixed(2)), "tipo": "M.N." },
      { "descripcion": "IVA", "monto": "$" + this.numberWithCommas(this.quotation.iva.toFixed(2)), "tipo": "M.N." },
      { "descripcion": "Total", "monto": "$" + this.numberWithCommas(this.quotation.total.toFixed(2)), "tipo": "M.N." },
    ];

    const autoTable2 = 'autoTable';
    doc[autoTable2](total_columna, rows, { styles: { halign: 'right' }, headStyles: { fillColor: [fillColor[0], fillColor[1], fillColor[2]] }, columnStyles: { descripcion: { cellWidth: 21 }, monto: { cellWidth: 30 }, tipo: { cellWidth: 15 } }, margin: { horizontal: 132 } }); //startY:  "autotable" +1,

    let obs_colum = [{ title: "Observaciones", dataKey: "commentSummon" },];
    let row = [{ "commentSummon": this.quotation.comments },];
    const autoTable3 = 'autoTable';
    doc[autoTable3](obs_colum, row, { styles: { cellWidth: 188, fillColor: [fillColor[0], fillColor[1], fillColor[2]] }, margin: { horizontal: 10 } }); //startY:  "autotable2" +1,

    const addFooters = doc => {
      const pageCount = doc.internal.getNumberOfPages()

      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.text('Pagina ' + String(i) + ' de ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
          align: 'center'
        })
      }
    };

    addFooters(doc);
    doc.save('cotizacion.pdf');
    this.close();
  }

  addConcept() {
    let concept = {
      code: this.fcKeyConcept.value,
      unit: this.fcUnitConcept.value,
      quantity: this.fcQuantityConcept.value,
      unit_price: this.fcUnitPriceConcept.value,
      description: this.fcDescriptionConcept.value,
      import: null
    }

    concept.import = (concept.quantity * concept.unit_price).toFixed(2);

    this.concepts.push(concept);
    this.clearAll();
    this.calculeTotals();
  }

  close() {
    this.dialogRef.close();
  }

  filterClient(value) {
    if (!value) {
      return;
    }

    this.generalService.getCustomerByDescription(value).subscribe(result => {
      this.customers = result.info;
    });
  }

  getItem(customerId) {
    let customer = this.customers.find(x => x.id == customerId);
    this.form.controls.customer_id.setValue(customerId);
    this.form.controls.customer_rfc.setValue(customer.rfc);

    this.form.controls.order_ids.setValue(null);
    this.getOrders(customerId);
  }

  getOrders(customerId){
    this.salesProcessService.getWorkOrdersNotAssigned(customerId, this.edit_quotation, this.quotation ? this.quotation.id : null).subscribe(result => {
      this.orders = result.orders;
    });
  }

  clearAll() {
    this.fcKeyConcept.setValue(null);
    this.fcUnitConcept.setValue(null);
    this.fcQuantityConcept.setValue(null);
    this.fcUnitPriceConcept.setValue(null);
    this.fcDescriptionConcept.setValue(null);
  }

  isNumber(evt,) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57)) || (charCode == 46 && evt.target.value.indexOf('.') != -1)) {
      return false;
    }
    return true;
  }

  calculeTotals() {
    let discount = this.form.controls.discount_p.value;
    this.import = 0;
    this.concepts.map(row => {
      this.import += Number(row.import);
    });

    if (this.isEmpty(discount)) {
      discount = 0;
    }

    this.discount = discount > 0 ? (discount * this.import) / 100 : 0;
    this.subtotal = this.import - this.discount;
    this.iva = this.subtotal * this.tasaIVA;
    this.total = this.subtotal + this.iva;

    this.setFormattedNumbers(this.import, this.discount, this.subtotal, this.iva, this.total);
  }

  isEmpty(str) {
    return (!str || /^\s*$/.test(str));
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  setFormattedNumbers(total_import, discount, subtotal, iva, total) {
    this.form.controls.import.setValue(this.numberWithCommas(total_import.toFixed(2)));
    this.form.controls.discount.setValue(this.numberWithCommas(discount.toFixed(2)));
    this.form.controls.subtotal.setValue(this.numberWithCommas(subtotal.toFixed(2)));
    this.form.controls.iva.setValue(this.numberWithCommas(iva.toFixed(2)));
    this.form.controls.total.setValue(this.numberWithCommas(total.toFixed(2)));
  }

  removeCommas(quotation) {
    quotation.import = quotation.import.toString().replace(',', '');
    quotation.discount = quotation.discount.toString().replace(',', '');
    quotation.subtotal = quotation.subtotal.toString().replace(',', '');
    quotation.iva = quotation.iva.toString().replace(',', '');
    quotation.total = quotation.total.toString().replace(',', '');

    return quotation;
  }

}
