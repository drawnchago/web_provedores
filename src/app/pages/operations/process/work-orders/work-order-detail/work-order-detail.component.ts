import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BombPiecesInspection } from 'src/app/shared/Interfaces/boms_pieces_inspection';
import { User } from 'src/app/shared/Interfaces/user';
import { WorkOrder } from 'src/app/shared/Interfaces/work_order';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OperationsService } from '../../../operations.service';

@Component({
  selector: 'app-work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.scss']
})
export class WorkOrderDetailComponent implements OnInit {
  form: FormGroup; //! Es el form
  user: User; //! Es la interface
  work_order: WorkOrder;  //! Es la interface
  bomb_pieces: any[]; //! Es la interface
  bomb_pieces_bomb_inspection: BombPiecesInspection[]; //! Es la interface
  bomb_pieces_motor_inspection: BombPiecesInspection[]; //! Es la interface
  action: string;

  constructor(public dialogRef: MatDialogRef<WorkOrderDetailComponent>,
    public toast: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private oppService: OperationsService) {
    this.work_order = { ...data };
    this.action = data.action;
    this.user = AuthService.getUser();
  }


  changedBomb(event, bomb, type) {
    //console.log(event)
    /* console.log(bomb) */
    switch (type) {
      case 'yes':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.yes = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'no':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.no = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'repair':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.repair = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'supply':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.supply = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'demand':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.demand = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'stock':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.stock = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'description':
        this.bomb_pieces_bomb_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.description = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
    }



  }
  changedMotor(event, bomb, type) {
    //console.log(event)
    /*console.log(bomb) */
    switch (type) {
      case 'yes':
        this.bomb_pieces_motor_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.yes = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'no':
        this.bomb_pieces_motor_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.no = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'repair':
        this.bomb_pieces_motor_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.repair = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'supply':
        this.bomb_pieces_motor_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.supply = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'demand':
        this.bomb_pieces_motor_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.demand = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
      case 'stock':
        this.bomb_pieces_motor_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.stock = event.target.checked;
            /* console.log(x); */
          }
        });
      case 'description':
        this.bomb_pieces_motor_inspection.map(x => {
          if (x.piece_bomb_id == bomb.piece_bomb_id) {
            x.description = event.target.checked;
            /* console.log(x); */
          }
        });
        break;
    }



  }

  saveOrder() {
    console.log('ok')
    let bomb_inspection = this.bomb_pieces_bomb_inspection;
    console.log('Inspecciones de bombas');
    console.log(bomb_inspection);

    let motor_inspection = this.bomb_pieces_motor_inspection;
    console.log('Inspecciones de motor');
    console.log(motor_inspection);

    this.oppService.finishOrders(this.work_order.id,this.user.id).subscribe(response=>{
      console.log(response);
    })
    this.oppService.saveInspecionPiece(bomb_inspection).subscribe(response => {
      console.log(response);
      this.closeDialog(response);

    });
    this.oppService.saveInspecionPiece(motor_inspection).subscribe(response => {
      console.log(response);
      this.closeDialog(response);

    });

  }
  ngOnInit(): void {
    //* console.log(this.work_order) 
    this.oppService.getPiecesByBombId(this.work_order.type_bomb_id, this.work_order.id, 'Bomba').subscribe(response => {
      this.bomb_pieces_bomb_inspection = response.pieces;
      //* console.log(this.bomb_pieces_bomb_inspection);
    });
    this.oppService.getPiecesByBombId(this.work_order.type_bomb_id, this.work_order.id, 'Partes Motor').subscribe(response => {
      this.bomb_pieces_motor_inspection = response.pieces;
      //* console.log(this.bomb_pieces_motor_inspection);

    });
  }
  closeDialog(response) {
    this.toast.success(response.message);
    this.dialogRef.close();
  }
}
