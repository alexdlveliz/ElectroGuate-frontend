import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Payment } from './../../models/payment.model';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient
  ) { }

  createPayment(payment: Payment): Observable<any> {
    return this.http.post(`${environment.url_api}/payments/payments/`, payment);
  }
}
