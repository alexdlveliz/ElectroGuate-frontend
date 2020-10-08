import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../../models/user.model';
import { environment } from './../../../../environments/environment.prod';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  response = '';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_api}/users/users/`);
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${environment.url_api}/users/users/`, user);
  }

  logIn(data): Observable<any> {
    return this.http.post(`${environment.url_api}/users/login/`, data)
      .pipe(
        map(dataResp => {
          console.log(dataResp);
          return dataResp;
        }),
        catchError(err => {
          console.warn(err);
          return throwError('Error personalizado');
        })
      );
  }

  logOut(): void {
    localStorage.removeItem('token');
  }

  userExists(): string {
    return localStorage.getItem('token');
  }

}
