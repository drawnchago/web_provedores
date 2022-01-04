import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { ShCatalogsService } from '../sh-catalogs.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { KindOfPersonDialogComponent } from './kind-of-persons-dialog/kind-of-persons-dialog.component';
import { KindOfPerson } from './kind-of-persons.model';

@Component({
  selector: 'app-kind-of-persons',
  templateUrl: './kind-of-persons.component.html',
  styleUrls: ['./kind-of-persons.component.scss']
})
export class KindOfPersonComponent implements OnInit {

  public kind_of_persons  : KindOfPerson[];
  public dataSource       : MatTableDataSource<KindOfPerson>;
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

    const dialogRef = this.dialog.open(KindOfPersonDialogComponent, {
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
    this.services.deleteKindOfPerson(data).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
      }else{
        this.toastr.success(response['message']);
      }

      this.load();
    })
  }

  load(){

    this.services.getKindOfPersons().subscribe(response=>{
        if(!response['success']){
          this.toastr.error(response['message']);
        }

        this.kind_of_persons = response['kind_of_persons'];
        this.dataSource = new MatTableDataSource<KindOfPerson>(this.kind_of_persons);
      });
  }

}
