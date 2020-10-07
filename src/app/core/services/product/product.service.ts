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

  /**
   * Método utilizado para obtener todos los productos
   * Se reintentará dos veces la petición, si llegara a fallar
   * Si no funciona, se capturará el error,
   * Si todo sale bien, se retornará un array de Productos
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url_api}/products/products/`)
      .pipe(
        retry(2),
        catchError(this.handleError),
        map((response: any) => response.results as Product[])
      );
  }

  /**
   * Método utilizado para obtener un sólo producto
   * Se reintentará 2 veces la petición, si llegara a fallar,
   * Si no funciona, se capturará el error,
   * Si todo sale bien, se retornará un Producto
   */
  getOneProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.url_api}/products/products/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError),
      map((response: any) => response.results as Product)
    );
  }

  createProduct(newProduct: Product): Observable<any> {
    return this.http.post(`${environment.url_api}/products/products`, newProduct);
  }

  updateProduct(id: number, changes: Partial<Product>): Observable<any> {
    return this.http.put(`${environment.url_api}/products/products/${id}/`, changes);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.url_api}/products/products/${id}/`);
  }

  private handleError(error: HttpErrorResponse): any {
    console.log(error);
    return throwError('ups, algo salió mal');
  }
}
