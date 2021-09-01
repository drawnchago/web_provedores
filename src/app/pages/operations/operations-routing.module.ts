import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { WorkOrdersComponent } from './process/work-orders/work-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'process/work-orders', pathMatch: 'full'},
  {
    path: 'process/work-orders',
    component: WorkOrdersComponent,
    canActivate: [AuthGuard], 
    data: {id: 24}
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
