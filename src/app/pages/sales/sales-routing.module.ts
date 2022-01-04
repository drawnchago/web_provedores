import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { QuotationsComponent } from './process/quotations/quotations.component';

const routes: Routes = [
  {path: '', redirectTo: 'sales-proccess/quotations', pathMatch: 'full'},
  {
    path: 'sales-process/quotations',
    component: QuotationsComponent,
    canActivate: [AuthGuard],
    data: {id: 59,
      title: 'Cotizaciones',
      urls: [
        { title: 'Procesos' },
        { title: 'Cotizaciones' }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
