import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaCatalogsService {

  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }
  
  getWareHouses(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getWarehouses');
  }

  saveWarehouses(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveWarehouses',data);
  }

  deleteWarehouses(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteWarehouses',data);
  }
}
