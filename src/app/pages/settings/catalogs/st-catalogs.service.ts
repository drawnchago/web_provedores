import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StCatalogsService {
  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }

  //COUNTRIES
  getCountries(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getCountries');
  }

  saveCountry(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveCountry',data);
  }

  deleteCountry(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteCountry',data);
  }

  //STATES
  getStates(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getStates');
  }

  saveState(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveState',data);
  }

  deleteState(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteState',data);
  }

  //MUNICIPALITIES
  getMunicipalities(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getMunicipalities');
  }

  saveMunicipality(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveMunicipality',data);
  }

  deleteMunicipality(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteMunicipality',data);
  }

  //AREAS
  getAreas(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getAreas');
  }

  saveArea(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveArea',data);
  }

  deleteArea(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteArea',data);
  }
  //PAYMENT METHODS
  getPaymentMethods(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getPaymentMethods');
  }

  savePaymentMethod(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'savePaymentMethod',data);
  }

  deletePaymentMethod(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deletePaymentMethod',data);
  }
  //COINS
  getCoins(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getCoins');
  }

  saveCoin(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveCoin',data);
  }

  deleteCoin(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'deleteCoin',data);
  }
}
