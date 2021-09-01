import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { User } from '../../../shared/Interfaces/user';
import { SettingsService } from '../settings.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [SettingsService]
})
export class UsersComponent implements OnInit {

  displayedColumns = ['#','name','email','cellphone','role','status','action'];
  dataSource: MatTableDataSource<User>;
  users: User[];
  constructor(private settingsService: SettingsService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.settingsService.getUsers().subscribe(result => {
      this.users = result.data;
      console.log(this.users);
      this.dataSource = new MatTableDataSource<User>(this.users);
    })
  }

  openDialog(action: string, obj: any){
    obj.action = action;

    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: obj,
      width: '40%'
    });
  }

  delete(element){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: '¿Estas seguro que deseas eliminar al usuario?', 
      name: element.name + ' ' + element.firstname}
    })
    .afterClosed()
    .subscribe((confirm: Boolean) => {
      if(confirm){
        this.toastr.success('Eliminado');
      }else{
        this.toastr.error('Cancelado');
      }
    });
  }

}
