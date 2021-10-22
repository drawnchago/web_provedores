import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { TypesBombDialogComponent } from './types-bomb-dialog/types-bomb-dialog.component';
import { OppCatalogsService } from '../op-catalogs.service';
import { typesBomb } from './types-bomb.model';

declare var $: any;

@Component({
  selector: 'app-types-bomb',
  templateUrl: './types-bomb.component.html',
  styleUrls: ['./types-bomb.component.scss'],
  providers: [OppCatalogsService]
})
export class TypesBombComponent implements OnInit {

  //Table
  public typesBomb : typesBomb[];
  public dataSource: MatTableDataSource<typesBomb>;
  public displayedColumns = ['name','description','status','updated_by','updated_at','created_by','created_at','action'];

  constructor(
              private service: OppCatalogsService,
              private toastr: ToastrService,
              public dialog: MatDialog) 
              {

              this.load();
              }

  ngOnInit(): void {
  }

  applyFilter(value){
    this.dataSource.filter = value;
  }

  openDialog(action: string, obj: any){

    obj.action = action;

    const dialogRef = this.dialog.open(TypesBombDialogComponent, {
      data: obj,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.load();
      }
    })
  }

  messageDelete(element){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: '¿Estas seguro que deseas eliminarlo?', 
      name: element.name}
    })
    .afterClosed()
    .subscribe((confirm: Boolean) => {
      if(confirm){
        this.delete(element);
      }else{
        this.toastr.error('Cancelado');
      }
    });
  }

  delete(element){
    
    let id = element.id;
    this.service.deleteTypeBomb(id).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.toastr.success(response['message']);
      this.load();
    })
  }
  load(){

    this.service.getTypesBomb().subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.typesBomb = response['typesBomb'];
      this.dataSource = new MatTableDataSource<typesBomb>(this.typesBomb);
    });

  }

}
