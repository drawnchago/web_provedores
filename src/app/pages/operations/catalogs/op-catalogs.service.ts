import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OppCatalogsService {
  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }

  //TYPES BOMB
  getTypesBomb(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getTypesBomb');
  }

  saveTypeBomb(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveTypeBomb',data);
  }

  deleteTypeBomb(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteTypeBomb',data);
  }
  //BRAND
  getBrandsBomb(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getBrandsBomb');
  }

  saveBrandBomb(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveBrandBomb',data);
  }

  deleteBrandBomb(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteBrandBomb',data);
  }
  //MODELS
  getModelsBomb(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getModelsBomb');
  }

  saveModelBomb(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveModelBomb',data);
  }

  deleteModelBomb(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteModelBomb',data);
  }
  
}
