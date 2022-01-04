import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PurchaseOrder } from 'src/app/shared/Interfaces/Purchase_Order';
import { GeneralService } from 'src/app/shared/services/general.service';
import { Providers } from '../../../catalogs/providers/providers.model';
import { ShProccessService } from '../../sh-process.service';

@Component({
  selector: 'app-purchase-order-dialog',
  templateUrl: './purchase-order-dialog.component.html',
  styleUrls: ['./purchase-order-dialog.component.scss']
})
export class PurchaseOrderDialogComponent implements OnInit {
  public form: FormGroup;
  public index: number;
  public action: string;
  public providers: Providers;
  public purchase_order: PurchaseOrder;
  constructor(public dialogRef: MatDialogRef<PurchaseOrderDialogComponent>,
    public fb: FormBuilder,
    public service: ShProccessService,
    public generalServices: GeneralService,
    private servicesSh: ShProccessService,
    private toastr: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.purchase_order = { ...data };
    this.action = data.action;
    this.form = this.fb.group({
      provider_id: [null, Validators.required],

    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.purchase_order);
    this.generalServices.getProviders().subscribe(response => {
      this.providers = response['providers'];
      console.log(this.providers)
    });
  }

  onTabChanged(e) {
    this.index = e.index;
  }

  nextMatTab() {
    this.index++;

    if (this.index > 2) {
      this.index = 0;
    }

  }
  closeDialog(success):void{
    this.dialogRef.close(success);
  }
  save() {
    let data = this.form.value;
    data.id = this.purchase_order.id;
    console.log(data)
    this.servicesSh.addProvider(data).subscribe(response => {
      if (response['success'] == true) {
        this.toastr.success(response['message']);
      }
      else {
        this.toastr.error(response['message']);
      }
      this.closeDialog(response['success']);
    });
  }

}
