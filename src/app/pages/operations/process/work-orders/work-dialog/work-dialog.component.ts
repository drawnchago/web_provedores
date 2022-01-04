import { Component, ComponentFactoryResolver, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { WorkOrder } from 'src/app/shared/Interfaces/work_order';
import { OperationsService } from '../../../operations.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/Interfaces/user';
import { Toast, ToastrService } from 'ngx-toastr';
import { BombPieces } from 'src/app/shared/Interfaces/bomb_pieces';
import { map } from 'rxjs/operators';
import { PiecesInspection } from 'src/app/shared/Interfaces/pieces_inspection';
import { BombPiecesInspection } from 'src/app/shared/Interfaces/boms_pieces_inspection';
import { OrderSheet } from '../../../../../shared/Interfaces/order_sheet';
import { DropzoneModule, DropzoneComponent, DropzoneDirective, DropzoneConfigInterface, DropzoneConfig } from 'ngx-dropzone-wrapper';
import { logging } from 'protractor';
import * as moment from 'moment';
import { Customer } from '../../../../admon/catalogs/customers/customers-dialog/customers-dialog.model';
import { TypeBomb } from '../../../catalogs/types-bomb/types-bomb-dialog/types-bomb-dialog.model';
import { BrandBomb } from '../../../catalogs/brands-bomb/brands-bomb-dialog/brands-bomb-dialog.model';
import { ModelBomb } from '../../../catalogs/models-bomb/models-bomb-dialog/models-bomb-dialog.model';
@Component({
  selector: 'app-work-dialog',
  templateUrl: './work-dialog.component.html',
  styleUrls: ['./work-dialog.component.scss']
})
export class WorkDialogComponent implements OnInit {

  public dropzoneConfig: DropzoneConfigInterface;

  @ViewChild(DropzoneComponent) dropzone: DropzoneComponent;

  form: FormGroup; //! Es el form
  user: User; //! Es la interface
  customers: Customer; //! Es la interface
  work_order: WorkOrder;  //! Es la interface
  order_sheet: OrderSheet;  //! Es la interface
  bombs: TypeBomb;  //! Es la interface
  brands: BrandBomb;  //! Es la interface
  models: ModelBomb;  //! Es la interface
  bomb_pieces: any[]; //! Es la interface
  bomb_pieces_bomb_inspection: BombPiecesInspection[]; //! Es la interface
  bomb_pieces_motor_inspection: BombPiecesInspection[]; //! Es la interface
  action: string;
  uploadImage: boolean;
  valid: boolean;
  constructor(
    public dialogRef: MatDialogRef<WorkDialogComponent>,
    public toast: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private oppService: OperationsService) {
    this.work_order = { ...data };
    this.action = data.action;
    this.user = AuthService.getUser();
    this.uploadImage = false;
    this.valid = false;

    this.form = this.fb.group({
      id: null,
      // ** Entrada de equipos
      position_order: [null, Validators.required],
      folio_equipment: [null, Validators.required],
      entry_date: [null, Validators.required],
      /* user: [null, Validators.required], */
      zone: [null, Validators.required],
      equipment_description: [null, Validators.required],
      place: [null, Validators.required],
      type: [null, Validators.required],
      description_entry: [null, Validators.required],
      comments_coditions: [null, Validators.required],
      equipment_application: [null, Validators.required],
      handling_fluid: [null, Validators.required],
      work_temperature: [null, Validators.required],
      exposed_pressure: [null, Validators.required],
      number_or_folio_requisition: [null, Validators.required],
      applicant: [null, Validators.required],
      witness: [null, Validators.required],
      priority_id: [null, Validators.required],
      // ** General de la orden de trabajo
      type_bomb_id: [null, Validators.required],
      customer_id: [null, Validators.required],
      brand_id: [null, Validators.required],
      model_id: [null, Validators.required],
      size: [null, Validators.required],
      stock: [null, Validators.required],
      exit_pass: [null, Validators.required],
      rpm: [null, Validators.required],
      hp: [null, Validators.required],
      evaluation: [null, Validators.required],
      set: [null, Validators.required],
      //** Medidas y peso de la orden de trabajo
      total_length_quantity: [null, Validators.required],
      total_diameter_quantity: [null, Validators.required],
      total_weight_quantity: [null, Validators.required],
      total_length_description: [null, Validators.required],
      total_diameter_description: [null, Validators.required],
      total_weight_description: [null, Validators.required],
      status: null,
    });

    this.dropzoneConfig = {
      url: '/api/saveWorkOrder',
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

  saveOrder() {
    let validatorMessage = this.validatedImg();
    console.log(this.valid)
    if (this.valid == true) {
      this.toast.success(validatorMessage);
      let data = this.form.value;
      data.user_id = this.user.id;
      this.dropzone.directiveRef.dropzone().on('sending', function (files, xhr, formData) {
        formData.append('id', data.id);
        formData.append('position_order', data.position_order);
        formData.append('entry_date', moment(data.entry_date).format("YYYY-MM-DD HH:mm:ss"));
        formData.append('zone', data.zone);
        formData.append('equipment_description', data.equipment_description);
        formData.append('place', data.place);
        formData.append('folio_equipment', data.folio_equipment);
        formData.append('type', data.type);
        formData.append('description_entry', data.description_entry);
        formData.append('comments_coditions', data.comments_coditions);
        formData.append('equipment_application', data.equipment_application);
        formData.append('handling_fluid', data.handling_fluid);
        formData.append('work_temperature', data.work_temperature);
        formData.append('exposed_pressure', data.exposed_pressure);
        formData.append('applicant', data.applicant);
        formData.append('witness', data.witness);
        formData.append('number_or_folio_requisition', data.number_or_folio_requisition);
        formData.append('priority_id', data.priority_id);
        formData.append('type_bomb_id', data.type_bomb_id);
        formData.append('customer_id', data.customer_id);
        formData.append('brand_id', data.brand_id);
        formData.append('model_id', data.model_id);
        formData.append('size', data.size);
        formData.append('stock', data.stock);
        formData.append('exit_pass', data.exit_pass);
        formData.append('rpm', data.rpm);
        formData.append('hp', data.hp);
        formData.append('evaluation', data.evaluation);
        formData.append('set', data.set);
        formData.append('total_length_quantity', data.total_length_quantity);
        formData.append('total_diameter_quantity', data.total_diameter_quantity);
        formData.append('total_weight_quantity', data.total_weight_quantity);
        formData.append('total_length_description', data.total_length_description);
        formData.append('total_diameter_description', data.total_diameter_description);
        formData.append('total_weight_description', data.total_weight_description);
        formData.append('status', data.status);
        formData.append('created_by', data.user_id);

      });

      this.dropzone.directiveRef.dropzone().processQueue();
    } else {
      this.toast.error(validatorMessage);
    }
  }


 
  public onMultiUploadSuccess(args: any): void {
    this.closeDialog(args[1]);
  }
  public onAddedFiles(args: any): void {
    if (args[0].accepted == true) {
      this.uploadImage = true
    } else {
      this.uploadImage = false
    }

  }

  validatedImg() {
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

  ngOnInit(): void {

    this.form.patchValue(this.work_order);
    this.oppService.getPiecesInspection('Bomba', this.work_order.id).subscribe(response => {
      this.bomb_pieces_bomb_inspection = response.pieces_inspection;
      /*  console.log(this.bomb_pieces_bomb_inspection); */
    });
    this.oppService.getPiecesInspection('Partes Motor', this.work_order.id).subscribe(response => {
      this.bomb_pieces_motor_inspection = response.pieces_inspection;
      /*   console.log(this.bomb_pieces_motor_inspection); */

    });
    this.oppService.getCustomersActives().subscribe(response => {
      this.customers = response.customers;
    })
    this.oppService.getBombsActives().subscribe(response => {
      this.bombs = response.bombs;

    })
    this.oppService.getBrandsActives().subscribe(response => {
      this.brands = response.brands;

    })
    this.oppService.getModelsActives().subscribe(response => {
      this.models = response.models;

    })
  }


  closeDialog(response) {
    this.toast.success(response.message);
    this.dialogRef.close();
  }


  changedBomb(event, bomb, type) {
    console.log(bomb)
    switch (type) {
      case 'yes':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.yes = event.target.checked;

          }
        });
        break;
      case 'no':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.no = event.target.checked;

          }
        });
        break;
      case 'repair':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.repair = event.target.checked;

          }
        });
        break;
      case 'supply':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.supply = event.target.checked;

          }
        });
        break;
      case 'demand':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.demand = event.target.checked;

          }
        });
        break;
      case 'stock':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.stock = event.target.checked;

          }
        });
      case 'description':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.description = event.target.checked;

          }
        });
        break;
    }

    /* 
        
     */


  }
}

