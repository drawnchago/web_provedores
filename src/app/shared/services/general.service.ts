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
}
