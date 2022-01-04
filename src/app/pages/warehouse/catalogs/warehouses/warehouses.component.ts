import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { WarehousesDialogComponent } from './warehouses-dialog/warehouses-dialog.component';
import { WaCatalogsService } from '../wa-catalogs.service';
import { Warehouses } from './warehouses.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {

  public warehouses       : Warehouses[];
  public dataSource       : MatTableDataSource<Warehouses>;
  public displayedColumns = ['description','status','created_at','created_by','updated_at','updated_by','action'];

  constructor(              
    
    private services : WaCatalogsService,
    private toastr   : ToastrService,
    public dialog    : MatDialog) { 

      this.load();
    }

  ngOnInit(): void {
  }

  applyFilter(value){
    this.dataSource.filter = value;
  }
  
  openDialog(action: string, obj: any){

    obj.action = action;

    const dialogRef = this.dialog.open(WarehousesDialogComponent, {
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
    
    const data = { 
      id:element.id
    }
    this.services.deleteWarehouses(data).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
      }else{
        this.toastr.success(response['message']);
      }

      this.load();
    })
  }

  load(){

    this.services.getWareHouses().subscribe(response=>{
      
        if(!response['success']){
          this.toastr.error(response['message']);
        }

        this.warehouses = response['warehouses'];
        this.dataSource = new MatTableDataSource<Warehouses>(this.warehouses);
      });
  }

}
