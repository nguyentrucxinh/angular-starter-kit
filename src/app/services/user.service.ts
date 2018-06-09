import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AUTH_HEADER, AUTH_TOKEN_TYPE } from '../constants/constants';

@Injectable()
export class UserService {

  constructor(private http: HttpService) { }

  token(info: { email: string, password: string }): Promise<any> {
    return this.http.post('jwt/token', JSON.stringify(info)).toPromise();
  }

  auth(): Promise<any> {
    return this.http.get('jwt/auth').toPromise();
  }

  setTokenToLocalStorage(token: string): void {
    localStorage.setItem(AUTH_HEADER, `${AUTH_TOKEN_TYPE} ${token}`);
  }
}
