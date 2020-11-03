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
    return this.http.get<Product>(`${environment.url_api}/products/products/${id}/`)
    .pipe(
      retry(2),
      catchError(this.handleError),
      map((response: any) => response as Product)
    );
  }

  /**
   * Método para crear un producto
   */
  createProduct(newProduct: Product): Observable<any> {
    return this.http.post(`${environment.url_api}/products/products/`, newProduct, {
      headers: {
        'Content-Type': undefined
      }
    });
  }

  /**
   * Método para actualizar un producto, recibiendo dos parámetros:
   *  El id del producto a actualizar, y
   * los cambios en sí
   */

  updateProduct(id: number, changes: Partial<Product>): Observable<any> {
    return this.http.put(`${environment.url_api}/products/products/${id}/`, changes);
  }

  /**
   * Método para eliminar un producto, recibiendo
   * como parámetro únicamente el id del producto a borrar
   */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.url_api}/products/products/${id}/`);
  }

  /**
   * Método para manejar los diferentes errores que puedan existir
   * en la petición
   */
  private handleError(error: HttpErrorResponse): any {
    console.log(error);
    return throwError('ups, algo salió mal');
  }
}
