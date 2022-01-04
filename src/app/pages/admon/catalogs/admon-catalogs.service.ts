import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmonCatalogsService {
  private readonly urlBase = '/api/';

  constructor(private httpClient: HttpClient) { }

  //COMPLEMENT
  getCfdi(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getCfdi');
  }
  getBanks(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getBanks');
  }
  getKindOfPersons(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getKindOfPersons');
  }

  //CUSTOMERS
  getCustomers(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getCustomers');
  }
  
  saveCustomer(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveCustomer',data);
  }

  deleteCustomer(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteCustomer',data);
  }
  
}
