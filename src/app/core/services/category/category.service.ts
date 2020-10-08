import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from './../../models/category.model';
import { environment } from './../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url_api}/products/category/`)
    .pipe(
      retry(2),
      map((response: any) => response.results as Category[])
    );
  }

  createCategory(newCategory: Category): Observable<any> {
    return this.http.post(`${environment.url_api}/products/category/`, newCategory);
  }
}
