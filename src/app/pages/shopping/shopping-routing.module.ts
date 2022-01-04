import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { ClassificationsComponent } from '../shopping/catalogs/classifications/classifications.component';
import { MeasurementUnitsComponent } from '../shopping/catalogs/measurement-units/measurement-units.component';
import { ProductsComponent } from './catalogs/products/products.component';
import { ProvidersComponent } from './catalogs/providers/providers.component';
import { TypeOfProductsComponent } from '../shopping/catalogs/type-of-products/type-of-products-units.component';
import { PurchaseOrderComponent } from './process/purchase-order/purchase-order.component';
import { PurchaseRequisitionsComponent } from './process/purchase-requisitions/purchase-requisitions.component';
import { CfdiComponent } from './catalogs/cfdi/cfdi.component';
import { BankComponent } from './catalogs/bank/bank.component';
import { KindOfPersonComponent } from './catalogs/kind-of-persons/kind-of-persons.component';
import { CommercialBusiness } from './catalogs/commercial_business/commercial-business-dialog/commercial-business-dialog.model';
import { CommercialBusinessComponent } from './catalogs/commercial_business/commercial-business.component';

const routes: Routes = [
  { path: '', redirectTo: 'shop-catalogs/products', pathMatch: 'full'},
  {
    path: 'shop-catalogs/products',
    component: ProductsComponent,
    canActivate: [AuthGuard], 
    data: {id: 33}
  },
  {
    path: 'shop-catalogs/providers',
    component: ProvidersComponent,
    canActivate: [AuthGuard], 
    data: {id: 34}
  },
  {
    path: 'shop-catalogs/measurement-units',
    component: MeasurementUnitsComponent,
    canActivate: [AuthGuard], 
    data: {id: 47}
  },
  {
    path: 'shop-catalogs/type-of-products',
    component: TypeOfProductsComponent,
    canActivate: [AuthGuard], 
    data: {id: 48}
  },
  {
    path: 'shop-catalogs/classifications',
    component: ClassificationsComponent,
    canActivate: [AuthGuard], 
    data: {id: 49}
  },
  {
    path: 'shop-catalogs/cfdi',
    component: CfdiComponent,
    canActivate: [AuthGuard], 
    data: {id: 63}
  },
  {
    path: 'shop-catalogs/banks',
    component: BankComponent,
    canActivate: [AuthGuard], 
    data: {id: 64}
  },
  {
    path: 'shop-catalogs/kind-of-persons',
    component: KindOfPersonComponent,
    canActivate: [AuthGuard], 
    data: {id: 65}
  },
  {
    path: 'shop-catalogs/commercial-business',
    component: CommercialBusinessComponent,
    canActivate: [AuthGuard], 
    data: {id: 66}
  },
  {
    path: 'shop-process/purchase-order',
    component: PurchaseOrderComponent,
    canActivate: [AuthGuard], 
    data: {id: 35}
  },
  {
    path: 'shop-process/purchase-requisitions',
    component: PurchaseRequisitionsComponent,
    canActivate: [AuthGuard], 
    data: {id: 36}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
