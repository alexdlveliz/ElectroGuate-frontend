import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Brand } from './../../models/brand.model';
import { environment } from './../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Método para obtener todas las marcas
   */
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${environment.url_api}/products/brand/`)
    .pipe(
      retry(2),
      map((response: any) => response.results as Brand[])
    );
  }

  /**
   * Método para obtener una única marca
   */
  getOneBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${environment.url_api}/products/brand/${id}/`)
    .pipe(
      retry(2),
      map((response: any) => response as Brand)
    );
  }

  /**
   * Método para actualizar una marca.
   * Recibe dos parámetros, el id de la marca a editar, y
   * la actualización en sí
   */
  updateBrand(id: number, changes: Partial<Brand>): Observable<any> {
    return this.http.put(`${environment.url_api}/products/brand/${id}`, changes);
  }

  /**
   * Método para crear una marca,
   * recibiendo un único parámetro, la marca en sí
   */
  createBrand(newBrand: Brand): Observable<any> {
    return this.http.post(`${environment.url_api}/products/brand/`, newBrand);
  }

  /**
   * Método para borrar una marca,
   * recibiendo el id de la marca a borrar
   */
  deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${environment.url_api}/products/brand/${id}/`);
  }

}
