import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { WorkOrdersComponent } from './process/work-orders/work-orders.component';
import { TypesBombComponent } from './catalogs/types-bomb/types-bomb.component';
import { BrandsBombComponent } from './catalogs/brands-bomb/brands-bomb.component';
import { ModelsBombComponent } from './catalogs/models-bomb/models-bomb.component';
import { OrderSheetsComponent } from './process/order-sheets/order-sheets.component';

const routes: Routes = [
  { path: '', redirectTo: 'process/work-orders', pathMatch: 'full'},
  {
    path: 'process/work-orders',
    component: WorkOrdersComponent,
    canActivate: [AuthGuard], 
    data: {id: 24}
  },
  {
    path: 'catalogs/types-bomb',
    component: TypesBombComponent,
    canActivate: [AuthGuard], 
    data: {id: 25}
  },
  {
    path: 'catalogs/brands-bomb',
    component: BrandsBombComponent,
    canActivate: [AuthGuard], 
    data: {id: 26}
  },
  {
    path: 'catalogs/models-bomb',
    component: ModelsBombComponent,
    canActivate: [AuthGuard], 
    data: {id: 27}
  },
  {
    path: 'process/order-sheets',
    component: OrderSheetsComponent,
    canActivate: [AuthGuard],
    data: {id: 56}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
