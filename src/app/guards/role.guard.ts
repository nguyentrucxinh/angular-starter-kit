import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Global } from '../services/global';
import { LocalStorageHelper } from '../helpers/helpers';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
    private authService: AuthService,
    private global: Global) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('RoleGuard - canActivateChild - Expected role', childRoute.data.expectedRole);
    return this.performCheck(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('RoleGuard - canActivate - Expected role', route.data.expectedRole);
    return this.performCheck(route, state);
  }

  private performCheck(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    console.log('Redirect URL', state.url);
    const expectedRole = next.data.expectedRole;
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
            this.router.navigate(['login'], { queryParams: { redirectUrl: state.url } });
            return resolve(false);
          })
          .catch(err => {
            LocalStorageHelper.removeAuthorization();
            this.router.navigate(['login'], { queryParams: { redirectUrl: state.url } });
            return resolve(false);
          });
      });
    }
  }
}
