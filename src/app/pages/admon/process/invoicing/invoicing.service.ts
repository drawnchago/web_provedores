import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicingService {
  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }

  getWorkOrders(start_date, end_date, invoiced): Observable<any>{
      return this.httpClient.get<any>(this.urlBase + 'getOrdersToInvoice?start_date=' + start_date + '&end_date=' + end_date + '&invoiced=' + invoiced);
  }
  
}
