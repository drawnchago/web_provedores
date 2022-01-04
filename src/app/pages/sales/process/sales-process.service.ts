import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesProcessService {
  private readonly urlBase = '/api/';

  constructor(private httClient: HttpClient) { }

  getQuoations(data: any): Observable<any>{
    return this.httClient.get<any>(this.urlBase + 'getQuotations?start_date=' + data.start_date + '&end_date=' + data.end_date);
  }

  saveQuotation(data: any): Observable<any>{
    return this.httClient.post<any>(this.urlBase + 'saveQuotation', data);
  }
  
  getLastFolioQuotation(): Observable<any>{
    return this.httClient.get<any>(this.urlBase + 'getLastFolioQuotation');
  }

  getWorkOrdersNotAssigned(customer_id, edit, quotation_id): Observable<any>{
    return this.httClient.get<any>(this.urlBase + 'getWorkOrdersNotAssigned?customer_id=' + customer_id +'&edit=' + edit + '&quotation_id=' + quotation_id);
  }
}
