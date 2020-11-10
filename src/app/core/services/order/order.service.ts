import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './../../models/order.model';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  createOrder(order: Order): Observable<any> {
    return this.http.post(`${environment.url_api}/orders/orders/`, order);
  }
}
