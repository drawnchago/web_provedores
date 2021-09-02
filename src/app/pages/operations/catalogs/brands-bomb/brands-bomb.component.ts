import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { BrandsBombDialogComponent } from './brands-bomb-dialog/brands-bomb-dialog.component';
import { CatalogsService } from '../catalogs.service';
import { brandsBomb } from './brands-bomb.model';

declare var $: any;

@Component({
  selector: 'app-brands-bomb',
  templateUrl: './brands-bomb.component.html',
  styleUrls: ['./brands-bomb.component.scss'],
  providers: [CatalogsService]
})
export class BrandsBombComponent implements OnInit {

  //Table
  public brandsBomb : brandsBomb[];
  public dataSource: MatTableDataSource<brandsBomb>;
  public displayedColumns = ['name','description','status','updated_by','updated_at','created_by','created_at','action'];

  constructor(
              private services: CatalogsService,
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

    obj.action      = action;

    const dialogRef = this.dialog.open(BrandsBombDialogComponent, {
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
    this.services.deleteBrandBomb(id).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.toastr.success(response['message']);
      this.load();
    })
  }
  load(){

    this.services.getBrandsBomb().subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.brandsBomb = response['brandsBomb'];
      this.dataSource = new MatTableDataSource<brandsBomb>(this.brandsBomb);
    });

  }

}
