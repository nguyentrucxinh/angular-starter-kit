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
    console.log('AuthGuard');
    console.log('Redirect URL', state.url);
    if (this.global.user) {
      return true;
    } else {
      return new Promise((resolve) => {
        this.authService.auth()
          .then((res) => {
            if (!res.status) {
              this.redirectToLogin(state.url);
              return resolve(false);
            }
            return resolve(true);
          })
          .catch(err => {
            this.redirectToLogin(state.url);
            return resolve(false);
          });
      });
    }
  }

  private redirectToLogin(redirectUrl: string) {
    LocalStorageHelper.removeAuthorization();
    this.router.navigate(['login'], { queryParams: { redirectUrl } });
  }
}
