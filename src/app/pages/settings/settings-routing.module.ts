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
  { path: '', redirectTo: 'sett-catalogs/users', pathMatch: 'full'},
  {
    path: 'sett-catalogs/users',
    component: UsersComponent,
    canActivate: [AuthGuard], 
    data: {id: 23}
  },
  /*{
    path: 'sett-catalogs/countries',
    component: CountriesComponent,
    canActivate: [AuthGuard], 
    data: {id: 50}
  },*/
  /*{
    path: 'sett-catalogs/states',
    component: StatesComponent,
    canActivate: [AuthGuard], 
    data: {id: 51}
  },*/
  /*{
    path: 'sett-catalogs/municipalities',
    component: MunicipalitiesComponent,
    canActivate: [AuthGuard], 
    data: {id: 52}
  },*/
  {
    path: 'sett-catalogs/areas',
    component: AreasComponent,
    canActivate: [AuthGuard], 
    data: {id: 53}
  },
  {
    path: 'sett-catalogs/payment-methods',
    component: PaymentMethodsComponent,
    canActivate: [AuthGuard], 
    data: {id: 54}
  },
  {
    path: 'sett-catalogs/coins',
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
