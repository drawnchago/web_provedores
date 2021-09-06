import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/Interfaces/user';
import { WorkOrder } from 'src/app/shared/Interfaces/work_order';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OperationsService } from '../../../operations.service';

@Component({
  selector: 'app-work-format',
  templateUrl: './work-format.component.html',
  styleUrls: ['./work-format.component.scss']
})
export class WorkFormatComponent implements OnInit {
  action: string;
  user: User;
  work_order: WorkOrder;
  order: any;
  pieces_inspection_bomb: any;
  pieces_inspection_motor: any
  constructor(public dialogRef: MatDialogRef<WorkFormatComponent>,
    public toast: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,

    private oppService: OperationsService) {
    this.work_order = { ...data };
    this.action = data.action;
    this.user = AuthService.getUser();


  }
  ngOnInit(): void {
    this.order = this.data;
    this.oppService.getPiecesInspection( 'Bomba',this.order.id).subscribe(response => {
      this.pieces_inspection_bomb = response.pieces_inspection;
      console.log(this.pieces_inspection_bomb);
    });
    this.oppService.getPiecesInspection( 'Partes Motor',this.order.id).subscribe(response => {
      this.pieces_inspection_motor = response.pieces_inspection;
      console.log(this.pieces_inspection_motor);
    });
  
    
  }

}
