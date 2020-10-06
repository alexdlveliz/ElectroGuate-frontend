import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Product } from './../../models/product.model';
import { environment } from './../../../../environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url_api}/products/products/`)
      .pipe(
        retry(2),
        catchError(this.handleError),
        map((response: any) => response.results as Product[])
      );
  }

  private handleError(error: HttpErrorResponse): any {
    console.log(error);
    return throwError('ups, algo salió mal');
  }
}
