import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductsComponent } from './catalogs/products/products.component';
import { ProvidersComponent } from './catalogs/providers/providers.component';
import { PurchaseOrderComponent } from './process/purchase-order/purchase-order.component';
import { PurchaseRequisitionComponent } from './process/purchase-requisition/purchase-requisition.component';


@NgModule({
  declarations: [ProductsComponent, ProvidersComponent, PurchaseOrderComponent, PurchaseRequisitionComponent],
  imports: [
    CommonModule,
    ShoppingRoutingModule
  ]
})
export class ShoppingModule { }
