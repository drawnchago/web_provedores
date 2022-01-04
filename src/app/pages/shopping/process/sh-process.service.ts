import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShProccessService {

  private readonly urlBase = '/api/';

  constructor(private httpClient: HttpClient) { }

  /***PURCHASE REQUISITION***/
  getPurchaseRequsitions(user_id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlBase + 'getPurchaseRequsitions?user_id=' + user_id);
  }
  getPurchaseRequsitionsByArea(user_id): Observable<any> {
    return this.httpClient.get<any>(this.urlBase + 'getPurchaseRequsitionsByArea?user_id=' + user_id);
  }
  savePurchaseRequsitiont(data): Observable<any> {
    return this.httpClient.post<any>(this.urlBase + 'savePurchaseRequsition', data);
  }
  //** Aprueba o rechaza la requisicion */
  approveOrDeny(data): Observable<any> {
    return this.httpClient.post<any>(this.urlBase + 'approveOrDeny', data);
  }
  //** Autoriza o rechaza la orden de compra */
  authorizeOrDeny(data): Observable<any> {
    return this.httpClient.post<any>(this.urlBase + 'authorizeOrDeny', data);
  }
  //** Agregar el proveedor al orden de compra */
  addProvider(data): Observable<any> {
    return this.httpClient.post<any>(this.urlBase + 'addProvider', data);
  }
  deletePurchaseRequsition(data): Observable<any> {
    return this.httpClient.post<any>(this.urlBase + 'deletePurchaseRequsition', data);
  }
  getRequisitionDetails(id: number, area_id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlBase + 'getRequisitionDetails?id=' + id + '&area_id=' + area_id);
  }
  //** Obtiene las ordenes de compra */
  getPurchaseOrders(): Observable<any> {
    return this.httpClient.get<any>(this.urlBase + 'getPurchaseOrders');
  }
  //** Obtiene el detalle de las ordenes de compra */
  getPurchaseOrdersDetails(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlBase + 'getPurchaseOrdersDetails?id=' + id);
  }
  getConversation(requisition_id: number, level_id: number, area_id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlBase + 'getConversation?requisition_id=' + requisition_id + '&level_id=' + level_id + '&area_id=' + area_id);
  }
  saveConversation(data): Observable<any> {
    return this.httpClient.post<any>(this.urlBase + 'saveConversation', data);
  }
}
