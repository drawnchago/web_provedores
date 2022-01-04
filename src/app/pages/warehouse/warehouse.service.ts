import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }

}
