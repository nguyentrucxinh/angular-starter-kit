import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class UserService {

  constructor(private http: HttpService) { }

  token(email: string, password: string) {
    return this.http.post('jwt/token', JSON.stringify({ email, password })).toPromise();
  }

  auth() {
    return this.http.get('jwt/auth').toPromise();
  }
}
