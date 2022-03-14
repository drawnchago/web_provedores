import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OperationsService } from '../../operations.service';
// import { DropzoneModule ,DropzoneComponent , DropzoneDirective, DropzoneConfigInterface, DropzoneConfig } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-upload-xml',
  templateUrl: './upload-xml.component.html',
  styleUrls: ['./upload-xml.component.scss'],
  providers: [AuthenticationService],
})
export class UploadXmlComponent implements OnInit {

  public role           : number;
  // public dropzoneConfig : DropzoneConfigInterface;
  constructor(
    private services: OperationsService,
    private toastr: ToastrService,
    public dialog: MatDialog) 
    {
       this.role  = AuthService.getUser().zwp_status;

      //  this.dropzoneConfig = {
      //   url: '/api/uploadPresentationLetter',
      //   maxFilesize: 50,
      //   timeout: 180000,
      //   uploadMultiple: true,
      //   autoReset: 1000,
      //   //parallelUploads: 0,
      //   autoProcessQueue: true,
      //   //params: {business: this.business_id,registration: this.registration, idStudent:this.idStudent,tab:'carta_presentacion_alumno'},
      //   acceptedFiles: 'application/pdf',
      // };

      this.load();
    }

  ngOnInit(): void {
  }


  load(){
    this.services.getProviders().subscribe(result=>{
      console.log('Result');
      console.log(result);
    })
  }
}
