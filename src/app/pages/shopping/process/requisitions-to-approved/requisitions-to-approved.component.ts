import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/Interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PurchaseRequsitions } from '../purchase-requisitions/purchase-requisitions.model';
import { ShProccessService } from '../sh-process.service';

@Component({
  selector: 'app-requisitions-to-approved',
  templateUrl: './requisitions-to-approved.component.html',
  styleUrls: ['./requisitions-to-approved.component.scss']
})
export class RequisitionsToApprovedComponent implements OnInit {
  user: User; //! Es la 
  purchaseRequistion: PurchaseRequsitions[];
  dataSource: MatTableDataSource<PurchaseRequsitions>;
  index : number;
  displayedColumns = ['desc_area', 'comments', 'status', 'created_at', 'created_by', 'updated_at', 'updated_by', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private services: ShProccessService,
    private toastr: ToastrService,
    public fb: FormBuilder,

  ) {
    this.user = AuthService.getUser();
  }

  ngOnInit(): void {
    this.services.getPurchaseRequsitionsByArea(this.user.id).subscribe(response => {

      if (!response['success']) {
        this.toastr.error(response['message']);
      }

      this.purchaseRequistion = response['purchase_requisitions'];
      this.dataSource = new MatTableDataSource<PurchaseRequsitions>(this.purchaseRequistion);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.firstPageLabel = 'Primera Pagina';
      this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
      this.paginator._intl.lastPageLabel = 'Ultima Pagina';
      this.paginator._intl.nextPageLabel = 'Siguiente Pagina ';
      this.paginator._intl.previousPageLabel = 'Anterior Pagina ';
    });
  }
  applyFilter(value) {
    this.dataSource.filter = value;
  }

  nextMatTab() {
    this.index++;

    if (this.index > 3) {
      this.index = 0;
    }

  }
  onTabChanged(e) {
    this.index = e.index;
  }

}
