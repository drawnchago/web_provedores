import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { ShCatalogsService } from '../sh-catalogs.service';
import { MeasurementUnits } from '../measurement-units/measurement-units.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MeasurementUnitsDialogComponent } from './measurement-units-dialog/measurement-units-dialog.component';

@Component({
  selector: 'app-measurement-units',
  templateUrl: './measurement-units.component.html',
  styleUrls: ['./measurement-units.component.scss']
})
export class MeasurementUnitsComponent implements OnInit {

  public measurement_units : MeasurementUnits[];
  public dataSource        : MatTableDataSource<MeasurementUnits>;
  public displayedColumns  = ['description','status','created_at','created_by','updated_at','updated_by','action'];

  constructor(              
    
    private services: ShCatalogsService,
    private toastr: ToastrService,
    public dialog: MatDialog) { 

      this.load();
    }

  ngOnInit(): void {
  }

  applyFilter(value){
    this.dataSource.filter = value;
  }
  
  openDialog(action: string, obj: any){

    obj.action = action;

    const dialogRef = this.dialog.open(MeasurementUnitsDialogComponent, {
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
    this.services.deleteMeasurementUnit(data).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
      }else{
        this.toastr.success(response['message']);
      }

      this.load();
    })
  }

  load(){

    this.services.getMeasurementUnits().subscribe(response=>{
      
        if(!response['success']){
          this.toastr.error(response['message']);
        }

        this.measurement_units = response['measurement_units'];
        this.dataSource = new MatTableDataSource<MeasurementUnits>(this.measurement_units);
      });
  }

}
