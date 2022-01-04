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

  saveExitSheet(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveExitSheet',data);
  }
  saveInspecionPiece(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveInspecionPiece',data);
  }
  saveNewPiece(data): Observable<any>{
    return this.httpClient.post<any>(this.urlBase + 'saveNewPiece',data);
  }
  
  updateStatusOrders(order_id,user_id): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'updateStatusOrders?order_id='+order_id+'&user_id='+user_id);
  }
  getWorkOrders(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getWorkOrders');
  }
 /*  getOrderSheetByWorkOrderId(work_order_id): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getOrderSheetByWorkOrderId?work_order_id='+work_order_id);
  } */
  
  getPiecesByBombId(bomb_id, work_order_id,type): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getPiecesByBombId?bomb_id='+bomb_id+'&type='+type+'&work_order_id='+work_order_id);
  }
  getPiecesInspection(type_piece,order_id): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + 'getPiecesInspection?type_piece='+type_piece+'&order_id='+order_id);
  }
  getOrdersEntry():Observable<any>{
    return this.httpClient.get<any>(this.urlBase+ 'getOrdersEntry');
  }
  getOrdertSheets(): Observable<any>{
    return this.httpClient.get<any>(this.urlBase +'getOrdetSheets');
  }
  getExitSheet():Observable<any>{
    return this.httpClient.get<any>(this.urlBase+ 'getExitSheet');
  }
  getCustomersActives():Observable<any>{
    return this.httpClient.get<any>(this.urlBase+ 'getCustomersActives');
  }
  getBombsActives():Observable<any>{
    return this.httpClient.get<any>(this.urlBase+ 'getBombsActives');
  }
  getModelsActives():Observable<any>{
    return this.httpClient.get<any>(this.urlBase+ 'getModelsActives');
  }
  getBrandsActives():Observable<any>{
    return this.httpClient.get<any>(this.urlBase+ 'getBrandsActives');
  }
  pdfEntry(id):Observable<any>{
    return this.httpClient.get<any>(this.urlBase+ 'pdfEntry?entry_id='+id);
  }
}
