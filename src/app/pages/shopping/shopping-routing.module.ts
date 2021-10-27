import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { ClassificationsComponent } from './catalogs/classifications/classifications.component';
import { MeasurementUnitsComponent } from './catalogs/measurement-units/measurement-units.component';
import { ProductsComponent } from './catalogs/products/products.component';
import { ProvidersComponent } from './catalogs/providers/providers.component';
import { TypeOfProductsComponent } from './catalogs/type-of-products/type-of-products-units.component';
import { PurchaseOrderComponent } from './process/purchase-order/purchase-order.component';
import { PurchaseRequisitionsComponent } from './process/purchase-requisitions/purchase-requisitions.component';

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
    path: 'catalogs/measurement-units',
    component: MeasurementUnitsComponent,
    canActivate: [AuthGuard], 
    data: {id: 47}
  },
  {
    path: 'catalogs/type-of-products',
    component: TypeOfProductsComponent,
    canActivate: [AuthGuard], 
    data: {id: 48}
  },
  {
    path: 'catalogs/classifications',
    component: ClassificationsComponent,
    canActivate: [AuthGuard], 
    data: {id: 49}
  },
  {
    path: 'process/purchase-order',
    component: PurchaseOrderComponent,
    canActivate: [AuthGuard], 
    data: {id: 35}
  },
  {
    path: 'process/purchase-requisitions',
    component: PurchaseRequisitionsComponent,
    canActivate: [AuthGuard], 
    data: {id: 36}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
