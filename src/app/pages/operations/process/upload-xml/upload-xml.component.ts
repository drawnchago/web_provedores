import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OperationsService } from '../../operations.service';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DropzoneConfig } from 'ngx-dropzone-wrapper';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-upload-xml',
  templateUrl: './upload-xml.component.html',
  styleUrls: ['./upload-xml.component.scss'],
  providers: [AuthenticationService],
})
export class UploadXmlComponent implements OnInit{

  //<<NUMBER>>
  public status_pr      : number;
  //<<STRING>>
  public xmlName        : string;
  public pdfName        : string;
  //<<BOOLEAN>>
  public isXmlSuccess   : boolean;
  public isPdfSuccess   : boolean;
  //<<DATASOURCE>>
  public dataSource     : any[];
  public dataSourceFile : any[];
  
  
  //<<DROPZONECONFIGINTERFACE>>
  public dropzoneConfig : DropzoneConfigInterface;
  @ViewChild(DropzoneComponent) dropzone: DropzoneComponent;
  displayedColumnsValid : string[]  = ['id', 'description'];
  displayedColumnsFile  : string [] = ['position','description','name'];
  displayedColumnButton : string [] = ['action'];

  constructor(
              private services : OperationsService,
              private toastr   : ToastrService,
              public dialog    : MatDialog) 
              {
                this.isXmlSuccess = false;
                this.isPdfSuccess = false;
                this.status_pr    = AuthService.getUser().status_av;        
                

                this.load();
              }

  ngOnInit(): void {}
  
  errorUploadFile(e){
    console.log('e');
    console.log(e);

    if(!e[0]['accepted']){
      this.toastr.error("No puedes cargar este tipo de documento");
      return;
    }
  }

  canceledUploadFile(e){
    console.log("canceledUploadFile");
    console.log(e);
  }

  successUploadFile(e,isXml){
    console.log('isXml=>'+isXml);
    console.log("successUploadFile");
    console.log(e);

    if(isXml){
      if(e[1]['success']){
        this.isXmlSuccess  = true;
        this.xmlName       = e[0]['upload']['filename'];
        //<<DROPZONE PDF>>
          this.dropzoneConfig = {
          url: '/api/checkAndSaveFile',
          clickable: true,
          uploadMultiple: false,
          maxFiles: 4,
          addRemoveLinks: true,
          acceptedFiles: "application/pdf",
          autoReset: 1000,
          errorReset: null,
          cancelReset: null,
          parallelUploads: 1,
          autoProcessQueue: true,
          dictDefaultMessage: "Arrastra o inserta el archivo PDF"
        };
      }
    }else if(!isXml){
        this.isPdfSuccess = true;
        this.pdfName      = e[0]['upload']['filename'];
    }
    
    if(this.isPdfSuccess ||  this.isXmlSuccess){

      this.dataSourceFile = [
        {position: 1,description:"XML",check:this.isXmlSuccess, name: this.xmlName},
        {position: 2,description:"PDF",check:this.isPdfSuccess, name: this.pdfName}
      ];
    }

    
  }

  messageDelete(){
    this.isXmlSuccess = false;
    this.isPdfSuccess = false;

    this.load();
  }

  load(){

    //<<DROPZONE XML>>
      this.dropzoneConfig = {
        url: '/api/checkAndSaveFile',
        clickable: true,
        uploadMultiple: false,
        maxFiles: 4,
        addRemoveLinks: true,
        acceptedFiles: ".xml",
        autoReset: 1000,
        errorReset: null,
        cancelReset: null,
        parallelUploads: 1,
        autoProcessQueue: true,
        dictDefaultMessage: "Arrastra o inserta el archivo XML"
      };

    this.services.getValidationsXml().subscribe(result=>{

      if(!result['success']){
        this.toastr.error(result['message']);
        return;
      }

      this.dataSource = result['rows'];
    });
  }
}
