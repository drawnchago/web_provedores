import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatListModule } from '@angular/material/list';

import { OperationsRoutingModule } from './providers-routing.module';
import { InvoicesComponent } from './process/invoices/invoices.component';
import { UploadXmlComponent } from './process/upload-xml/upload-xml.component';
import { PurchaseOrderComponent } from './process/purchase-order/purchase-order.component';
// import { WorkDialogComponent } from './process/work-orders/work-dialog/work-dialog.component';


@NgModule({
  declarations: [
    InvoicesComponent,
    UploadXmlComponent,
    PurchaseOrderComponent
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
