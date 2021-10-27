import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { ShCatalogsService } from '../sh-catalogs.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { TypeOfProductsDialogComponent } from './type-of-products-dialog/type-of-products-dialog.component';
import { TypeOfProducts } from './type-of-products-units.model';

@Component({
  selector: 'app-type-of-products-units',
  templateUrl: './type-of-products-units.component.html',
  styleUrls: ['./type-of-products-units.component.scss']
})
export class TypeOfProductsComponent implements OnInit {

  public type_of_products : TypeOfProducts[];
  public dataSource       : MatTableDataSource<TypeOfProducts>;
  public displayedColumns = ['description','status','created_at','created_by','updated_at','updated_by','action'];

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

    const dialogRef = this.dialog.open(TypeOfProductsDialogComponent, {
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
    this.services.deleteTypeOfProduct(data).subscribe(response=>{

      if(!response['success']){
        this.toastr.error(response['message']);
      }else{
        this.toastr.success(response['message']);
      }

      this.load();
    })
  }

  load(){

    this.services.getTypeOfProducts().subscribe(response=>{
      
        if(!response['success']){
          this.toastr.error(response['message']);
        }

        this.type_of_products = response['type_of_products'];
        this.dataSource = new MatTableDataSource<TypeOfProducts>(this.type_of_products);
      });
  }

}
