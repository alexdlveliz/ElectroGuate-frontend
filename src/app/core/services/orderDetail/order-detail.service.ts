import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetail } from './../../models/order-detail.model';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(
    private http: HttpClient
  ) { }

  createOrderDetails(orderDetail: OrderDetail): Observable<any> {
    return this.http.post(`${environment.url_api}/orders/detail_orders/`, orderDetail);
  }
}
