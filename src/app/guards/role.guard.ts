import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './../services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private userService: UserService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.userService.auth()
        .then((res) => {
          console.log(res);
          const expectedRole = route.data.expectedRole;
          if (res.status && res.data.id && res.data.role_id === expectedRole) {
            resolve(true);
            return;
          }
          this.router.navigate(['login']);
          resolve(false);
          return;
        })
        .catch(err => {
          this.router.navigate(['login']);
          resolve(false);
          return;
        });
    });
  }
}
