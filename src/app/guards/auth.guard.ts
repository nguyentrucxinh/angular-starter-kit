import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { Global } from '../services/global';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private userService: UserService,
    private global: Global) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // state.url -> redirect url
    if (!localStorage.getItem('Authorization')) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
