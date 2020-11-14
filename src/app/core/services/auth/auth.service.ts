import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  values = [];
  role: string;
  token: string;
  constructor() { }

  setLocalStorage(usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getLocalStorage(): string {
    return JSON.parse(localStorage.getItem('usuario'));
  }

  deleteLocalStorage(): void {
    localStorage.removeItem('usuario');
  }

  getValues(): any[] {
    const answer = JSON.parse(localStorage.getItem('usuario'));
    const values = [];
    const role = [];
    // tslint:disable-next-line: forin
    for (const i in answer) {
      values.push([i, answer[i]]);
    }
    return values;
  }

  getUserRole(): string {
    if (this.getLocalStorage()) {
      this.values = this.getValues();
      this.role = this.values[2][1];
      return this.role;
    }
    return null;
  }

  getToken(): string {
    if (this.getLocalStorage()) {
      this.values = this.getValues();
      this.token = this.values[0][1];
      return this.token;
    }
    return null;
  }

  getUserEmail(): string {
    if (this.getLocalStorage()) {
      this.values = this.getValues();
      this.token = this.values[1][1];
      return this.token;
    }
    return null;
  }
}
