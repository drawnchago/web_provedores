import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WharehousesComponent } from './catalogs/wharehouses/wharehouses.component';
import { MaterialsReceiptComponent } from './process/materials-receipt/materials-receipt.component';
import { StartingOrderComponent } from './process/starting-order/starting-order.component';
import { StockAdjustmentComponent } from './process/stock-adjustment/stock-adjustment.component';


@NgModule({
  declarations: [WharehousesComponent, MaterialsReceiptComponent, StartingOrderComponent, StockAdjustmentComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule
  ]
})
export class WarehouseModule { }
