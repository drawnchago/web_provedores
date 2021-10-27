import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductsComponent } from './catalogs/products/products.component';
import { ProvidersComponent } from './catalogs/providers/providers.component';
import { PurchaseOrderComponent } from './process/purchase-order/purchase-order.component';
import { PurchaseRequisitionsComponent } from './process/purchase-requisitions/purchase-requisitions.component';
import { ProductDialogComponent } from './catalogs/products/products-dialog/products-dialog.component';
import { MeasurementUnitsDialogComponent } from './catalogs/measurement-units/measurement-units-dialog/measurement-units-dialog.component';
import { MeasurementUnitsComponent } from './catalogs/measurement-units/measurement-units.component';
import { TypeOfProductsDialogComponent } from './catalogs/type-of-products/type-of-products-dialog/type-of-products-dialog.component';
import { TypeOfProductsComponent } from './catalogs/type-of-products/type-of-products-units.component';
import { ClassificationsComponent } from './catalogs/classifications/classifications.component';
import { ClassificationsDialogComponent } from './catalogs/classifications/classification-dialog/classifications-dialog.component';
import { ProvidersDialogComponent } from './catalogs/providers/providers-dialog/providers-dialog.component';
import { PurchaseRequisitionsDialogComponent } from './process/purchase-requisitions/purchase-requisitions-dialog/purchase-requisitions-dialog.component';


@NgModule({
  declarations: [
     ProductsComponent,
     ProductDialogComponent,
     ProvidersComponent,
     ProvidersDialogComponent,
     PurchaseOrderComponent,
     PurchaseRequisitionsComponent,
     PurchaseRequisitionsDialogComponent,
     ProductDialogComponent,
     MeasurementUnitsComponent,
     MeasurementUnitsDialogComponent,
     TypeOfProductsComponent,
     TypeOfProductsDialogComponent,
     ClassificationsComponent,
     ClassificationsDialogComponent
    ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class ShoppingModule { }
