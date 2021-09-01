import { Injectable } from '@angular/core';
import {BehaviorSubject,  Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly urlBase = '/api/';

  constructor (private httpClient: HttpClient) {}

  login(data: any): Observable<any>{
    return this.httpClient.post(this.urlBase + 'login', data);
  }
}
