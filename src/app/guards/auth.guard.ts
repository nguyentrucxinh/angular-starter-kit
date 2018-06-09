import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Global } from '../services/global';
import { LocalStorageHelper } from '../helpers/helpers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
    private global: Global) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // state.url -> redirect url
    if (this.global.user) {
      return true;
    } else {
      return new Promise((resolve) => {
        this.authService.auth()
          .then((res) => {
            if (res.status) {
              return resolve(true);
            }
            LocalStorageHelper.removeAuthorization();
            this.router.navigate(['login']);
            return resolve(false);
          })
          .catch(err => {
            LocalStorageHelper.removeAuthorization();
            this.router.navigate(['login']);
            return resolve(false);
          });
      });
    }
  }
}
