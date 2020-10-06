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

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${environment.url_api}/products/brand/`)
    .pipe(
      retry(2),
      map((response: any) => response.results as Brand[])
    );
  }
}
