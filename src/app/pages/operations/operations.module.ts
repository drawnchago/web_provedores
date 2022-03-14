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
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UploadXmlComponent } from './process/upload-xml/upload-xml.component';
import { InvoicesComponent } from './process/invoices/invoices.component';
import { PurchaseOrderComponent } from './process/purchase-order/purchase-order.component';


@NgModule({
  declarations: [
    UploadXmlComponent,
    InvoicesComponent,
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
    NgxDropzoneModule,
    DropzoneModule
  ]
})
export class OperationsModule { }
