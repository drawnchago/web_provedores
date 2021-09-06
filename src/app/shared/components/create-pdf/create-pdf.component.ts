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
    const doc = new jsPDF();

    var x = document.getElementById("myTd");

    const pdfTable = this.pdfTable.nativeElement;
    //LISTA,IZQUIERDA,ARRIBA,ANCHURA,ALTURA
    doc.addImage('assets/images/logo-bovisa.png', 'png', 10, 5,10,14);
    doc.addImage('assets/images/logo-bovisa-text.png', 'png', 20, 5,35,15);
    doc.addImage('assets/images/bomb1.png', 'png', 85, 7,25,12);
    doc.addImage('assets/images/bomb2.png', 'png', 110, 8,25,10);
    doc.addImage('assets/images/bomb5.png', 'png', 135, 10,20,7);
    doc.addImage('assets/images/bomb4.png', 'png', 160, 5,25,15);
    doc.addImage('assets/images/bomb3.png', 'png', 190, 5,25,30);
    // doc.setFontSize(8);¿
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190
    });
    doc.save('test.pdf');
  }
}
