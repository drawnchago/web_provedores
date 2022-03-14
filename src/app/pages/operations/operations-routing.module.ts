import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { InvoicesComponent } from './process/invoices/invoices.component';
import { PurchaseOrderComponent } from './process/purchase-order/purchase-order.component';
import { UploadXmlComponent } from './process/upload-xml/upload-xml.component';

const routes: Routes = [
  { path: '', redirectTo: 'process/invoices', pathMatch: 'full'},
  {
    path: 'process/invoices',
    component: InvoicesComponent,
    canActivate: [AuthGuard], 
    data: {id: 6}
  },
  {
    path: 'process/upload-xml',
    component: UploadXmlComponent,
    canActivate: [AuthGuard], 
    data: {id: 7}
  },
  {
    path: 'process/purchase-order',
    component: PurchaseOrderComponent,
    canActivate: [AuthGuard], 
    data: {id: 8}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
