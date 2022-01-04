import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OperationsService } from 'src/app/pages/operations/operations.service';
import { BombPiecesInspection } from 'src/app/shared/Interfaces/boms_pieces_inspection';
import { User } from 'src/app/shared/Interfaces/user';
import { WorkOrder } from 'src/app/shared/Interfaces/work_order';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-piece-dialog',
  templateUrl: './add-piece-dialog.component.html',
  styleUrls: ['./add-piece-dialog.component.scss']
})
export class AddPieceDialogComponent implements OnInit {
  form: FormGroup; //! Es el form
  user: User; //! Es la interface
  work_order: WorkOrder;
  constructor(public dialogRef: MatDialogRef<AddPieceDialogComponent>, 
    public toast: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private oppService: OperationsService) {
    this.work_order = { ...data };
    this.user = AuthService.getUser(); { }
    this.form = this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    console.log(this.work_order)
  }
  savePiece() {
    let data = this.form.value;
    data.user_id = this.user.id;
    data.type_bomb_id = this.work_order.type_bomb_id;
    console.log(data);

    this.oppService.saveNewPiece(data).subscribe(response => {
      console.log(response);
      this.closeDialog(response.message);

    });


  }
  closeDialog(response) {
    this.toast.success(response);
    this.dialogRef.close();
  }
}
