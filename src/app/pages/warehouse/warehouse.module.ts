import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehousesComponent } from './catalogs/warehouses/warehouses.component';
import { MaterialsReceiptComponent } from './process/materials-receipt/materials-receipt.component';
import { StartingOrderComponent } from './process/starting-order/starting-order.component';
import { StockAdjustmentComponent } from './process/stock-adjustment/stock-adjustment.component';
import { WarehousesDialogComponent } from './catalogs/warehouses/warehouses-dialog/warehouses-dialog.component';


@NgModule({
  declarations: [
    WarehousesComponent,
    MaterialsReceiptComponent,
    StartingOrderComponent,
    StockAdjustmentComponent,
    WarehousesDialogComponent
  ],
  imports: [
    WarehouseRoutingModule,
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class WarehouseModule { }
