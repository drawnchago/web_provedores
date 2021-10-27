import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShProccessService {

  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }
  
  /***PURCHASE REQUISITION***/
  getPurchaseRequsitions(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getPurchaseRequsitions');
  }
  savePurchaseRequsitiont(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'savePurchaseRequsition',data);
  }
  deletePurchaseRequsition(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deletePurchaseRequsition',data);
  }
  getRequisitionDetails(id:number): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getRequisitionDetails?id=' + id);
  }

}
