import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from './../../models/category.model';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Método para obtener todas las categorías creadas
   */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url_api}/products/category?page=1`)
    .pipe(
      retry(2),
      map((response: any) => response.results as Category[])
    );
  }

  /**
   * Método para obtener una única categoría.
   * Recibe un único parámetro, el id de la categoría a buscar
   */
  getOneCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.url_api}/products/category/${id}/`)
    .pipe(
      retry(2),
      map((response: any) => response as Category)
    );
  }

  /**
   * Método para actualizar una categoría.
   * Recibe dos parámetros, el id de la categoría a actualizar, y
   * la nueva información.
   */
  updateCategory(id: number, changes: Partial<Category>): Observable<any> {
    return this.http.put(`${environment.url_api}/products/category/${id}/`, changes);
  }


  /**
   * Método para crear una nueva categoría.
   * Recibe un único parámetro, la categoría como tal a crear.
   */
  createCategory(newCategory: Category): Observable<any> {
    console.log('*****************************');
    console.log(newCategory);
    return this.http.post(`${environment.url_api}/products/category`, newCategory);
  }

  /**
   * Método para eliminar una categoría.
   * Recibe un único parámetro, el id de la categoría a eliminar
   */
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.url_api}/products/category/${id}/`);
  }
}
