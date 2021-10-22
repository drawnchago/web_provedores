import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { ProductsComponent } from './catalogs/products/products.component';
import { ProvidersComponent } from './catalogs/providers/providers.component';
import { PurchaseOrderComponent } from './process/purchase-order/purchase-order.component';
import { PurchaseRequisitionComponent } from './process/purchase-requisition/purchase-requisition.component';

const routes: Routes = [
  { path: '', redirectTo: 'catalogs/products', pathMatch: 'full'},
  {
    path: 'catalogs/products',
    component: ProductsComponent,
    canActivate: [AuthGuard], 
    data: {id: 33}
  },
  {
    path: 'catalogs/providers',
    component: ProvidersComponent,
    canActivate: [AuthGuard], 
    data: {id: 34}
  },
  {
    path: 'process/purchase-order',
    component: PurchaseOrderComponent,
    canActivate: [AuthGuard], 
    data: {id: 35}
  },
  {
    path: 'process/purchase-requisition',
    component: PurchaseRequisitionComponent,
    canActivate: [AuthGuard], 
    data: {id: 36}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
