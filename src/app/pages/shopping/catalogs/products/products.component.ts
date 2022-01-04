import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { ShCatalogsService } from '../sh-catalogs.service';
import { Products } from '../products/products.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProductDialogComponent } from './products-dialog/products-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products         : Products[];
  public dataSource       : MatTableDataSource<Products>;
  public displayedColumns = ["code","description","measurement_description","classification_description","type_product_description","status","created_at","created_by","updated_at","updated_by",'action'];

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

    const dialogRef = this.dialog.open(ProductDialogComponent, {
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
    
    const DATA = { 
      id:element.id
    }

    this.services.deleteProduct(DATA).subscribe(response=>{
      if(!response['success']){
        this.toastr.error(response['message']);
      }else{
        this.toastr.success(response['message']);
      }

      this.load();
    })
  }

  load(){

    this.services.getProducts().subscribe(response=>{
      
        if(!response['success']){
          this.toastr.error(response['message']);
        }

        this.products = response['products'];
        this.dataSource = new MatTableDataSource<Products>(this.products);
      });
  }

}
