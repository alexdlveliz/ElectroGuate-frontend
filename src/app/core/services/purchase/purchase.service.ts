import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Order } from './../../models/order.model';
import { OrderDetail } from './../../models/order-detail.model';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http: HttpClient
  ) { }

  getOrderByUserId(userId?: string): Observable<Order[]> {
    const params = new HttpParams().set('user', userId);
    return this.http.get<Order[]>(`${environment.url_api}/orders/orders/`, { params })
    .pipe(
      retry(2),
      map((response: any) => response.results as Order[])
    );
  }

  getDetailOrders(orderId: string): Observable<OrderDetail[]> {
    const params = new HttpParams().set('order', orderId);
    return this.http.get(`${environment.url_api}/orders/detail_orders/`, { params })
    .pipe(
      retry(2),
      map((response: any) => response.results as OrderDetail[])
    );
  }
}
