import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private readonly urlBase = '/api/';
  
  constructor(private httpClient: HttpClient) { }

  saveWorkOrder(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveWorkOrder',data);
  }
  saveInspecionPiece(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveInspecionPiece',data);
  }
  getWorkOrders(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getWorkOrders');
  }
  getPiecesByBombId(bomb_id, work_order_id,type): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getPiecesByBombId?bomb_id='+bomb_id+'&type='+type+'&work_order_id='+work_order_id);
  }
  getPiecesInspection(type_piece,order_id): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getPiecesInspection?type_piece='+type_piece+'&order_id='+order_id);
  }
  
}
