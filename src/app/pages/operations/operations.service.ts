import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }

  getProviders(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getProviders');
  }
  
}
