import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { OperationsRoutingModule } from './operations-routing.module';
import { WorkOrdersComponent } from './process/work-orders/work-orders.component';
import { WorkDialogComponent } from './process/work-orders/work-dialog/work-dialog.component';
import { WorkFormatComponent } from './process/work-orders/work-format/work-format.component';
import { TypesBombComponent } from './catalogs/types-bomb/types-bomb.component';
import { TypesBombDialogComponent } from './catalogs/types-bomb/types-bomb-dialog/types-bomb-dialog.component';
import { BrandsBombComponent } from './catalogs/brands-bomb/brands-bomb.component';
import { BrandsBombDialogComponent } from './catalogs/brands-bomb/brands-bomb-dialog/brands-bomb-dialog.component';
import { ModelsBombComponent } from './catalogs/models-bomb/models-bomb.component';
import { ModelsBombDialogComponent } from './catalogs/models-bomb/models-bomb-dialog/models-bomb-dialog.component';
import { WorkOrderDetailComponent } from './process/work-orders/work-order-detail/work-order-detail.component';
import { OrderSheetsComponent } from './process/order-sheets/order-sheets.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ExitSheetsComponent } from './process/exit-sheets/exit-sheets.component';
import { EntrySheetsComponent } from './process/entry-sheets/entry-sheets.component';
import { ExitDialogComponent } from './process/work-orders/exit-dialog/exit-dialog.component';
import { AddPieceDialogComponent } from './process/work-orders/work-order-detail/add-piece-dialog/add-piece-dialog.component';
// import { WorkDialogComponent } from './process/work-orders/work-dialog/work-dialog.component';


@NgModule({
  declarations: [
    WorkOrdersComponent,
    WorkDialogComponent,
    WorkFormatComponent,
    TypesBombComponent,
    TypesBombDialogComponent,
    BrandsBombComponent,
    BrandsBombDialogComponent,
    ModelsBombComponent,
    ModelsBombDialogComponent,
    WorkOrderDetailComponent,
    OrderSheetsComponent,
    ExitSheetsComponent,
    EntrySheetsComponent,
    ExitDialogComponent,
    AddPieceDialogComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    DropzoneModule
  ]
})
export class OperationsModule { }
