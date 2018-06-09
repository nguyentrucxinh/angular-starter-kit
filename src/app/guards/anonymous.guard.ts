import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Global } from '../services/global';
import { LocalStorageHelper } from '../helpers/helpers';

@Injectable()
export class AnonymousGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
    private global: Global) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AnonymousGuard');
    // state.url -> redirect url
    if (!LocalStorageHelper.getAuthorization()) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
