import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }

}
