import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../../models/user.model';
import { environment } from './../../../../environments/environment.prod';
import { AuthService } from './../auth/auth.service';

import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  response = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_api}/users/users/`)
    .pipe(
      retry(2),
      map((response: any) => response.results as User[])
    );
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${environment.url_api}/users/users/`, user);
  }

  logIn(data): Observable<any> {
    return this.http.post(`${environment.url_api}/users/login/`, data)
      .pipe(
        map(dataResp => {
          // console.log(dataResp);
          this.authService.setLocalStorage(dataResp);
          return dataResp;
        }),
        catchError(err => {
          console.warn(err);
          return throwError('Error personalizado');
        })
      );
  }

  logOut(): void {
    this.authService.deleteLocalStorage();
  }
}
