import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { QuotationsComponent } from './process/quotations/quotations.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuotationDialogComponent } from './process/quotations/quotation-dialog/quotation-dialog.component';


@NgModule({
  declarations: [QuotationsComponent, QuotationDialogComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class SalesModule { }
