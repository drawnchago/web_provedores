import { Component, Inject, OnInit, Optional } from '@angular/core';
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
@Component({
  selector: 'app-work-dialog',
  templateUrl: './work-dialog.component.html',
  styleUrls: ['./work-dialog.component.scss']
})
export class WorkDialogComponent implements OnInit {
  form: FormGroup; //! Es el form
  user: User; //! Es la interface
  work_order: WorkOrder;  //! Es la interface
  bomb_pieces: any[]; //! Es la interface
  bomb_pieces_bomb_inspection: BombPiecesInspection[]; //! Es la interface
  bomb_pieces_motor_inspection: BombPiecesInspection[]; //! Es la interface
  action: string;

  constructor(public dialogRef: MatDialogRef<WorkDialogComponent>,
    public toast: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private oppService: OperationsService) {
    this.work_order = { ...data };
    this.action = data.action;
    this.user = AuthService.getUser();
    this.form = this.fb.group({
      id: null,
      // ** Entrada de equipos
      position_order: [null, Validators.required],
      folio_equipment: [null, Validators.required],
      entry_date: [null, Validators.required],
      user: [null, Validators.required],
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

  }
/*   handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
    };
} */
  saveOrder() {
    let data = this.form.value;
    data.user_id = this.user.id;
    console.log(data);
      this.oppService.saveWorkOrder(data).subscribe(response => {
        /*  this.closeDialog(response);  */
      });

      console.log(this.bomb_pieces_bomb_inspection);



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

  ngOnInit(): void {

    this.form.patchValue(this.work_order);

    /* console.log(this.work_order) */
         this.oppService.getPiecesInspection('Bomba', this.work_order.id).subscribe(response => {
          this.bomb_pieces_bomb_inspection = response.pieces_inspection;
         /*  console.log(this.bomb_pieces_bomb_inspection); */
        });
        this.oppService.getPiecesInspection('Partes Motor',this.work_order.id).subscribe(response => {
          this.bomb_pieces_motor_inspection = response.pieces_inspection;
        /*   console.log(this.bomb_pieces_motor_inspection); */
    
        }); 
        

  }

  closeDialog(response) {
    this.toast.success(response.message);
    this.dialogRef.close();
  }

}
  
