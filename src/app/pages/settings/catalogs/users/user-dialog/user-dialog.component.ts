import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/shared/Interfaces/user';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  user: User;
  action: string;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder) { 
      
      this.user = {...data};
      console.log(data);
      this.action = data.action;

      if(this.user.img === undefined){
        this.user.img = 'assets/images/users/default.png';
      }

      this.form = this.fb.group({
        id: null,
        role_id: [null, Validators.required],
        name: [null, Validators.required],
        firstname: [null, Validators.required],
        surname: null,
        username: [null, Validators.required],
        password: [null, Validators.required],
        phone: null,
        cellphone: [null, Validators.required],
        email: null,
        street: null,
        int_number: null,
        out_number: null,
        suburb: null,
        postal_code: null,
        state_id: null,
        municipality_id: null,
        status: null,
        img: null,
      });

      if(this.user.id != undefined){
        this.form.patchValue(this.user);
      }
    }

  ngOnInit(): void {
  }

  selectFile(event: any) {
    debugger;
    if (!event.target.files[0] || event.target.files[0].length == 0) {
        //this.msg = 'You must select an image';
        return;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        //this.msg = "Only images are supported";
        return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
        this.user.img = reader.result;
    }
  }
}
