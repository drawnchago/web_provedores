import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './catalogs/users/users.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { CountriesComponent } from './catalogs/countries/countries.component';
import { StatesComponent } from './catalogs/states/states.component';
import { MunicipalitiesComponent } from './catalogs/municipalities/municipalities.component';
import { AreasComponent } from './catalogs/areas/areas.component';
import { PaymentMethodsComponent } from './catalogs/payment-methods/payment-methods.component';
import { CoinsComponent } from './catalogs/coin/coins.component';

const routes: Routes = [
  { path: '', redirectTo: 'catalogs/users', pathMatch: 'full'},
  {
    path: 'catalogs/users',
    component: UsersComponent,
    canActivate: [AuthGuard], 
    data: {id: 23}
  },
  {
    path: 'catalogs/countries',
    component: CountriesComponent,
    canActivate: [AuthGuard], 
    data: {id: 50}
  },
  {
    path: 'catalogs/states',
    component: StatesComponent,
    canActivate: [AuthGuard], 
    data: {id: 51}
  },
  {
    path: 'catalogs/municipalities',
    component: MunicipalitiesComponent,
    canActivate: [AuthGuard], 
    data: {id: 52}
  },
  {
    path: 'catalogs/areas',
    component: AreasComponent,
    canActivate: [AuthGuard], 
    data: {id: 53}
  },
  {
    path: 'catalogs/payment-methods',
    component: PaymentMethodsComponent,
    canActivate: [AuthGuard], 
    data: {id: 54}
  },
  {
    path: 'catalogs/coins',
    component: CoinsComponent,
    canActivate: [AuthGuard], 
    data: {id: 55}
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
