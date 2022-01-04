import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { ExitSheet } from 'src/app/shared/Interfaces/ExitSheet';
import { User } from 'src/app/shared/Interfaces/user';
import { WorkOrder } from 'src/app/shared/Interfaces/work_order';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OperationsService } from '../../../operations.service';
import { requireCheckboxesToBeCheckedValidator } from './require-checkboxes-to-be-checked.validator';

@Component({
  selector: 'app-exit-dialog',
  templateUrl: './exit-dialog.component.html',
  styleUrls: ['./exit-dialog.component.scss']
})
export class ExitDialogComponent implements OnInit {
  public dropzoneConfig: DropzoneConfigInterface;
  @ViewChild(DropzoneComponent) dropzone: DropzoneComponent;

  form: FormGroup; //! Es el form
  user: User; //! Es la interface
  work_order: WorkOrder;  //! Es la interface
  exit_sheet: ExitSheet;  //! Es la interface
  uploadImage: boolean;
  valid: boolean;
  constructor(
    public dialogRef: MatDialogRef<ExitDialogComponent>,
    public toast: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private oppService: OperationsService) {
    this.work_order = { ...data };
    /*     this.action = data.action; */
    this.user = AuthService.getUser();
    this.uploadImage = false;
    this.valid = false;
    this.form = this.fb.group({
      id: null,
      invoice_or_referral: [null, Validators.required],
      /*   exit_pass: [null, Validators.required],
        zone: [null, Validators.required], */
      exit_date: [null, Validators.required],
      /* equipment_folio: [null, Validators.required], */
      material_description: [null, Validators.required],
      order: [null, Validators.required],
      type: [null, Validators.required],
      optionsCheck: new FormGroup({
        drips: new FormControl(false),
        test_pressure: new FormControl(false),
        leakage: new FormControl(false),
        arrow_end_dimension: new FormControl(false),
        threads: new FormControl(false),
        screws_cooling_lines: new FormControl(false),
        armed: new FormControl(false),
        keyhole: new FormControl(false),
        levels: new FormControl(false),
        packaging: new FormControl(false),
      }, requireCheckboxesToBeCheckedValidator()),
      observations: [null, Validators.required],
      applicant: [null, Validators.required],
      witness: [null, Validators.required],
    });


    this.dropzoneConfig = {
      url: '/api/saveExitSheet',
      clickable: true,
      uploadMultiple: true,
      maxFiles: 4,
      addRemoveLinks: true,
      acceptedFiles: ".jpeg,.jpg,.png,.gif",
      autoReset: null,
      errorReset: null,
      cancelReset: null,
      parallelUploads: 4,
      autoProcessQueue: false,
      dictDefaultMessage: "Arrastra o inserta las imagenes de evidencia",
    };

  }


  ngOnInit(): void {


  }


  saveExit() {
    let validatorMessage = this.validateCheckBoxAndImg();
    console.log(this.valid)
    if (this.valid == true) {
      this.toast.success(validatorMessage);
      let data = this.form.value;
      data.user_id = this.user.id;
      data.work_order_id = this.work_order.id;
      this.dropzone.directiveRef.dropzone().on('sending', function (files, xhr, formData) {
        formData.append('id', data.id);
        formData.append('invoice_or_referral', data.invoice_or_referral);
        formData.append('exit_date', moment(data.exit_date).format("YYYY-MM-DD HH:mm:ss"));
        formData.append('order', data.order);
        formData.append('type', data.type);
        formData.append('material_description', data.material_description);
        formData.append('drips', data.optionsCheck.drips == true ? 1 : 0);
        formData.append('test_pressure', data.optionsCheck.test_pressure == true ? 1 : 0);
        formData.append('leakage', data.optionsCheck.leakage == true ? 1 : 0);
        formData.append('arrow_end_dimension', data.optionsCheck.arrow_end_dimension == true ? 1 : 0);
        formData.append('threads', data.optionsCheck.threads == true ? 1 : 0);
        formData.append('screws_cooling_lines', data.optionsCheck.screws_cooling_lines == true ? 1 : 0);
        formData.append('armed', data.optionsCheck.armed == true ? 1 : 0);
        formData.append('keyhole', data.optionsCheck.keyhole == true ? 1 : 0);
        formData.append('levels', data.optionsCheck.levels == true ? 1 : 0);
        formData.append('packaging', data.optionsCheck.packaging == true ? 1 : 0);
        formData.append('observations', data.observations);
        formData.append('applicant', data.applicant);
        formData.append('witness', data.witness);
        formData.append('work_order_id', data.work_order_id);
        formData.append('created_by', data.user_id);
        console.log(formData);
      });

      this.dropzone.directiveRef.dropzone().processQueue();

    } else {
      this.toast.error(validatorMessage);
    }
  }

  public onAddedFiles(args: any): void {
    if (args[0].accepted == true) {
      this.uploadImage = true
    } else {
      this.uploadImage = false
    }

  }
  public onMultiUploadSuccess(args: any): void {
    this.closeDialog(args[1]);
  }
  validateCheckBoxAndImg() {
    if (this.form.valid == true && this.uploadImage == true) {
      this.valid = true;
      return 'Registro Valido'
    }
    else if (this.form.valid == false && this.uploadImage == false) {
      this.valid = false;
      return 'Favor de ingresar las imagenes de evidencia Y  llenar los campos faltantes'
    }
    else if (this.form.valid == false) {
      this.valid = false;
      return 'Favor llenar los campos faltantes'
    }
    else if (this.uploadImage == false) {
      this.valid = false;
      return 'Favor de ingresar las imagenes de evidencia'
    } else {
      this.valid = false;
      return 'Favor de ingresar las imagenes de evidencia o  llenar los campos faltantes'
    }

  }

  closeDialog(response) {
    this.toast.success(response.message);
    this.dialogRef.close();
  }

}
