import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from './menu-items';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  private readonly urlBase = '/api/';
  public static menuItems: Menu[];
  
  constructor(private http: HttpClient) { }

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.urlBase + 'getMenu');
  }
}
