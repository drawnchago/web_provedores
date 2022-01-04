import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { WarehousesComponent } from './catalogs/warehouses/warehouses.component';
import { MaterialsReceiptComponent } from './process/materials-receipt/materials-receipt.component';
import { StartingOrderComponent } from './process/starting-order/starting-order.component';
import { StockAdjustmentComponent } from './process/stock-adjustment/stock-adjustment.component';

const routes: Routes = [
  { path:'', redirectTo: 'wa-catalogs/wharehouses', pathMatch: 'full'},
  {
    path: 'wa-catalogs/warehouses',
    component: WarehousesComponent,
    canActivate: [AuthGuard], 
    data: {id: 29}
  },
  {
    path: 'wa-process/stock-adjustment',
    component: StockAdjustmentComponent,
    canActivate: [AuthGuard], 
    data: {id: 30}
  },
  {
    path: 'wa-process/starting-order',
    component: StartingOrderComponent,
    canActivate: [AuthGuard], 
    data: {id: 31}
  },
  {
    path: 'wa-process/materials-receipt',
    component: MaterialsReceiptComponent,
    canActivate: [AuthGuard], 
    data: {id: 32}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
