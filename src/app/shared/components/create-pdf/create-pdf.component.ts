import { Component, OnInit, Inject, Optional  , ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from "jspdf";

import { AuthService } from 'src/app/shared/services/auth.service';
import { BranchOffices } from './create-pdf.model';
import { CreatePDFService } from './create-pdf.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-create-pdf',
  templateUrl: './create-pdf.component.html',
  styleUrls: ['./create-pdf.component.scss'],
  providers:[CreatePDFService]
})
export class CreatePdfComponent implements OnInit {
  public userName      : string;
  public BranchOffices : BranchOffices[];

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  constructor(
              private service:CreatePDFService
              ){
              }

  ngOnInit(): void {
  }

  valid(){
    
  }
  sendData(data){
    let id = data.id;

    console.log('Entro');
    // this.service.getBranchOffice(id).subscribe(response=>{
    //   console.log('response');
    //   console.log(response);
    // });

  }

  createPDF(){
    
  }
}
