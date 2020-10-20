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

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Método para retornar todos los usuarios,
   * tomando solamente la parte de los 'results'
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_api}/users/users/`)
    .pipe(
      retry(2),
      map((response: any) => response.results as User[])
    );
  }

  /**
   * Método para retornar un sólo usuario.
   * Recibe solamente un parámetro, el id del usuario a buscar
   */
  getOneUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.url_api}/users/users/${id}/`)
    .pipe(
      retry(2),
      map((response: any) => response as User)
    );
  }

  /**
   * Método para actualizar un usuario, recibiendo dos
   * parámetros, el id del usuario a actualizar, y
   * la nueva información.
   */
  updateUser(id: number, changes: Partial<User>): Observable<any> {
    return this.http.put(`${environment.url_api}/users/users/${id}/`, changes);
  }

  /**
   * Método para crear una cuenta.
   * Recibe un parámetro, el usuario a crear.
   */
  signIn(user: User): Observable<any> {
    return this.http.post(`${environment.url_api}/users/users/`, user);
  }

  /**
   * Método para iniciar sesión.
   * Recibe la información del usuario para iniciar sesión,
   * el correo y la contraseña
   */
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

  /**
   * Método para cerrar sesión
   */
  logOut(): void {
    this.authService.deleteLocalStorage();
  }
}
