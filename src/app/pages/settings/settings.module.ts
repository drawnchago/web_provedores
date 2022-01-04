import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatListModule } from '@angular/material/list';

import { SettingsRoutingModule } from './settings-routing.module';
import { UsersComponent } from './catalogs/users/users.component';
import { UserDialogComponent } from './catalogs/users/user-dialog/user-dialog.component';
import { CountriesComponent } from './catalogs/countries/countries.component';
import { CountriesDialogComponent } from './catalogs/countries/countries-dialog/countries-dialog.component';
import { StatesComponent } from './catalogs/states/states.component';
import { StatesDialogComponent } from './catalogs/states/states-dialog/states-dialog.component';
import { MunicipalitiesComponent } from './catalogs/municipalities/municipalities.component';
import { MunicipalitiesDialogComponent } from './catalogs/municipalities/municipalities-dialog/municipalities-dialog.component';
import { AreasComponent } from './catalogs/areas/areas.component';
import { AreasDialogComponent } from './catalogs/areas/areas-dialog/areas-dialog.component';
import { PaymentMethodsComponent } from './catalogs/payment-methods/payment-methods.component';
import { PaymentMethodsDialogComponent } from './catalogs/payment-methods/payment-methods-dialog/payment-methods-dialog.component';
import { CoinsComponent } from './catalogs/coin/coins.component';
import { CoinsDialogComponent } from './catalogs/coin/coins-dialog/coins-dialog.component';


@NgModule({
  declarations: [
    CoinsComponent,
    CoinsDialogComponent,
    PaymentMethodsComponent,
    PaymentMethodsDialogComponent,
    AreasComponent,
    AreasDialogComponent,
    MunicipalitiesComponent,
    MunicipalitiesDialogComponent,
    StatesComponent,
    StatesDialogComponent,
    CountriesComponent,
    CountriesDialogComponent,
    UsersComponent,
     UserDialogComponent],

  imports: [
    CommonModule,
    SettingsRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class SettingsModule { }
