import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private readonly urlBase = '/api/';

  constructor(private httpClient: HttpClient) { }

  //
  getBranchOffice(id:number): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getBranchOffice?id='+ id);
  }
  getBranchOffices(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getBranchOffices');
  }
  getStatesByType(id:number,type:number): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getStatesByType?id=' + id + '&type=' + type);
  }
  getMunicipalitiesByType(id:number,type:number): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getMunicipalitiesByType?id=' + id + '&type=' + type);
  }
  getProviders(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getProviders');
  }
  getAreasByType(id:number,type:number): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getAreasByType?id=' + id + '&type=' + type);
  }
  getUsersByType(id:number,type:number): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getUsersByType?id=' + id + '&type=' + type);
  }
  getProductsByType(id:number,type:number,description:string): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getProductsByType?id=' + id + '&type=' + type + '&description=' + description);
  }
  getCustomersActives():Observable<any>{
    return this.httpClient.get<any>(this.urlBase+ 'getCustomersActives');
  }
  getCustomerByDescription(value: string): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getCustomerByDescription?filter=' + value);
  }
  getTasaIva(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getTasaIVA');
  }
}
