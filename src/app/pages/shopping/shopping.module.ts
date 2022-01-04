import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatExpansionModule} from '@angular/material/expansion';

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
import { CfdiComponent } from './catalogs/cfdi/cfdi.component';
import { CfdiDialogComponent } from './catalogs/cfdi/cfdi-dialog/cfdi-dialog.component';
import { BankComponent } from './catalogs/bank/bank.component';
import { BankDialogComponent } from './catalogs/bank/bank-dialog/bank-dialog.component';
import { KindOfPersonDialogComponent } from './catalogs/kind-of-persons/kind-of-persons-dialog/kind-of-persons-dialog.component';
import { KindOfPersonComponent } from './catalogs/kind-of-persons/kind-of-persons.component';
import { CommercialBusinessComponent } from './catalogs/commercial_business/commercial-business.component';
import { CommercialBusinessDialogComponent } from './catalogs/commercial_business/commercial-business-dialog/commercial-business-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PurchaseOrderDialogComponent } from './process/purchase-order/purchase-order-dialog/purchase-order-dialog.component';

@NgModule({
  declarations: [
     ProductsComponent,
     ProductDialogComponent,
     ProvidersComponent,
     ProvidersDialogComponent,
     PurchaseOrderComponent,
     PurchaseOrderDialogComponent,
     PurchaseRequisitionsComponent,
     PurchaseRequisitionsDialogComponent,
     ProductDialogComponent,
     MeasurementUnitsComponent,
     MeasurementUnitsDialogComponent,
     TypeOfProductsComponent,
     TypeOfProductsDialogComponent,
     ClassificationsComponent,
     ClassificationsDialogComponent,
     CfdiComponent,
     CfdiDialogComponent,
     BankComponent,
     BankDialogComponent,
     KindOfPersonComponent,
     KindOfPersonDialogComponent,
     CommercialBusinessComponent,
     CommercialBusinessDialogComponent
    ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatExpansionModule,
    MatDialogModule
  ]
})
export class ShoppingModule { }
