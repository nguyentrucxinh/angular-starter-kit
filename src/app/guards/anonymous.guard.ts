import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Global } from '../services/global';
import { LocalStorageHelper } from '../helpers/helpers';

@Injectable()
export class AnonymousGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
    private authService: AuthService,
    private global: Global) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('RoleGuard - canActivateChild');
    return this.performCheck(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AnonymousGuard - canActivate');
    return this.performCheck(route, state);
  }

  private performCheck(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    console.log('Redirect URL', state.url);

    if (!LocalStorageHelper.getAuthorization()) {
      return true;
    }

    if (next.queryParams.redirectUrl && !['/login', 'login'].includes(next.queryParams.redirectUrl)) {
      this.router.navigateByUrl(next.queryParams.redirectUrl);
    } else {
      this.router.navigateByUrl('/home');
    }

    return false;
  }
}
