import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';

import { DemoMaterialModule } from '../../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatListModule } from '@angular/material/list';
import { WorkOrdersComponent } from './process/work-orders/work-orders.component';
import { WorkDialogComponent } from './process/work-orders/work-dialog/work-dialog.component';
import { WorkFormatComponent } from './process/work-orders/work-format/work-format.component';


@NgModule({
  declarations: [
    WorkOrdersComponent,
    WorkDialogComponent,
    WorkFormatComponent,
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class OperationsModule { }
