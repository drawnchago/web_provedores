import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { ShCatalogsService } from '../sh-catalogs.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CommercialBusinessDialogComponent } from './commercial-business-dialog/commercial-business-dialog.component';
import { CommercialBusiness } from './commercial-business.model';

@Component({
  selector: 'app-commercial-business',
  templateUrl: './commercial-business.component.html',
  styleUrls: ['./commercial-business.component.scss']
})
export class CommercialBusinessComponent implements OnInit {

  public commercial_business : CommercialBusiness[];
  public dataSource          : MatTableDataSource<CommercialBusiness>;
  public displayedColumns = ['name','description','status','created_at','created_by','updated_at','updated_by','action'];

  constructor(              
    
    private services : ShCatalogsService,
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

    const dialogRef = this.dialog.open(CommercialBusinessDialogComponent, {
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
    this.services.deleteCommercialBusiness(data).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
      }else{
        this.toastr.success(response['message']);
      }

      this.load();
    })
  }

  load(){

    this.services.getCommercialBusiness().subscribe(response=>{
        if(!response['success']){
          this.toastr.error(response['message']);
        }

        this.commercial_business = response['commercial_business'];
        this.dataSource = new MatTableDataSource<CommercialBusiness>(this.commercial_business);
      });
  }

}
