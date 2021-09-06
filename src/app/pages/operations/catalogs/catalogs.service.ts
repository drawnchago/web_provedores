import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }

  //TYPES BOMB
  getTypesBomb(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getTypesBomb');
  }

  saveTypeBomb(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveTypeBomb?name=' + data.name        +
                                                        '&description='  + data.description +      
                                                        '&userId='       + data.userId      +      
                                                        '&status='       + data.status      ,data);
  }

  deleteTypeBomb(id:number): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteTypeBomb?id=' + id ,id);
  }
  //BRAND
  getBrandsBomb(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getBrandsBomb');
  }

  saveBrandBomb(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveBrandBomb?name=' + data.name       +
                                                        '&description='  + data.description +      
                                                        '&userId='       + data.userId      +      
                                                        '&status='       + data.status      ,data);
  }

  deleteBrandBomb(id:number): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteBrandBomb?id=' + id ,id);
  }
  //MODELS
  getModelsBomb(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getModelsBomb');
  }

  saveModelBomb(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveModelBomb?name=' + data.name       +
                                                        '&description='  + data.description +      
                                                        '&userId='       + data.userId      +      
                                                        '&status='       + data.status      ,data);
  }

  deleteModelBomb(id:number): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteModelBomb?id=' + id ,id);
  }
  //CUSTOMERS
  getCustomers(): Observable<any>{
      return this.httpClient.get<any>(this.urlBase + 'getCustomers');
    }
    
  saveCustomer(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveCustomer?name=' + data.name        +
                                                        '&description='  + data.description +      
                                                        '&userId='       + data.userId      +      
                                                        '&status='       + data.status      ,data);
  }

  deleteCustomer(id:number): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteCustomer?id=' + id ,id);
  }
  //
  getBranchOffice(id:number): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getBranchOffice?id='+ id);
  }
}
