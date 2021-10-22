import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmonRoutingModule } from './admon-routing.module';
import { InvoicingComponent } from './process/invoicing/invoicing.component';
import { PaymentApplicationComponent } from './process/payment-application/payment-application.component';
import { AccountsReceivableComponent } from './process/accounts-receivable/accounts-receivable.component';
import { DebsToPayComponent } from './process/debs-to-pay/debs-to-pay.component';
import { AccountStatusComponent } from './process/account-status/account-status.component';

@NgModule({
  declarations: [InvoicingComponent, PaymentApplicationComponent, AccountsReceivableComponent, DebsToPayComponent, AccountStatusComponent],
  imports: [
    CommonModule,
    AdmonRoutingModule
  ]
})
export class AdmonModule { }
