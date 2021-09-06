import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ModelsBombDialogComponent } from './models-bomb-dialog/models-bomb-dialog.component';
import { CatalogsService } from '../catalogs.service';
import { ModelBomb } from './models-bomb.model';

declare var $: any;

@Component({
  selector: 'app-models-bomb',
  templateUrl: './models-bomb.component.html',
  styleUrls: ['./models-bomb.component.scss'],
  providers: [CatalogsService]
})
export class ModelsBombComponent implements OnInit {

  //Table
  public modelBomb : ModelBomb[];
  public dataSource: MatTableDataSource<ModelBomb>;
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

    obj.action = action;

    const dialogRef = this.dialog.open(ModelsBombDialogComponent, {
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
    this.services.deleteModelBomb(id).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.toastr.success(response['message']);
      this.load();
    })
  }
  load(){

    this.services.getCustomers().subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
        return;
      }

      this.modelBomb = response['modelsBomb'];
      this.dataSource = new MatTableDataSource<ModelBomb>(this.modelBomb);
    });

  }

}
