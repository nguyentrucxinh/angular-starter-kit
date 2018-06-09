import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Global } from '../services/global';
import { LocalStorageHelper } from '../helpers/helpers';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
    private global: Global) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('RoleGuard', route.data.expectedRole);
    // state.url -> redirect url
    const expectedRole = route.data.expectedRole;
    if (this.global.user) {
      return this.global.user.role_id === expectedRole;
    } else {
      return new Promise((resolve) => {
        this.authService.auth()
          .then((res) => {
            if (res.status && res.data.id && res.data.role_id === expectedRole) {
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
