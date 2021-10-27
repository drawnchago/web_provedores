import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { CustomersComponent } from './catalogs/customers/customers.component';
import { InvoicingComponent } from './process/invoicing/invoicing.component';
import { PaymentApplicationComponent } from './process/payment-application/payment-application.component';
import { AccountsReceivableComponent } from './process/accounts-receivable/accounts-receivable.component';
import { DebsToPayComponent } from './process/debs-to-pay/debs-to-pay.component';
import { AccountStatusComponent } from './process/account-status/account-status.component';


const routes: Routes = [
  { path: '', redirectTo: 'catalogs/customers', pathMatch: 'full'},
  {
    path: 'catalogs/customers',
    component: CustomersComponent,
    canActivate: [AuthGuard], 
    data: {id: 41}
  },
  {
    path: 'process/payment-application',
    component: PaymentApplicationComponent,
    canActivate: [AuthGuard], 
    data: {id: 42}
  },
  {
    path: 'process/accounts-receivable',
    component: AccountsReceivableComponent,
    canActivate: [AuthGuard], 
    data: {id: 43}
  },
  {
    path: 'process/debs-to-pay',
    component: DebsToPayComponent,
    canActivate: [AuthGuard], 
    data: {id: 44}
  },
  {
    path: 'process/account-status',
    component: AccountStatusComponent,
    canActivate: [AuthGuard], 
    data: {id: 45}
  },
  {
    path: 'process/invoicing',
    component: InvoicingComponent,
    canActivate: [AuthGuard], 
    data: {id: 46}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmonRoutingModule { }
