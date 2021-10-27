import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdmonRoutingModule } from './admon-routing.module';
import { InvoicingComponent } from './process/invoicing/invoicing.component';
import { PaymentApplicationComponent } from './process/payment-application/payment-application.component';
import { AccountsReceivableComponent } from './process/accounts-receivable/accounts-receivable.component';
import { DebsToPayComponent } from './process/debs-to-pay/debs-to-pay.component';
import { AccountStatusComponent } from './process/account-status/account-status.component';
import { CustomersComponent } from './catalogs/customers/customers.component';
import { CustomersDialogComponent } from './catalogs/customers/customers-dialog/customers-dialog.component';

@NgModule({
  declarations: [
     CustomersComponent,
     CustomersDialogComponent,
     InvoicingComponent,
     PaymentApplicationComponent,
     AccountsReceivableComponent,
     DebsToPayComponent,
     AccountStatusComponent],
  imports: [
    CommonModule,
    AdmonRoutingModule,
      DemoMaterialModule,
      FlexLayoutModule,
      FormsModule,
      MatListModule,
      ReactiveFormsModule,
      NgxDatatableModule
  ]
})
export class AdmonModule { }
