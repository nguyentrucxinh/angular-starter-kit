import { Injectable } from '@angular/core';

import { Global } from './global';
import { AuthService } from './auth.service';
import { AUTH_HEADER } from '../constants/constants';

@Injectable()
export class InitProvider {

  constructor(
    private global: Global,
    private authService: AuthService) {
  }

  load() {
    console.log('Run init data');
    // return new Promise((resolve, reject) => {

    //   const dataLocalStorage = localStorage.getItem(AUTH_HEADER);
    //   if (!dataLocalStorage) {
    //     this.global.isGuestUser = true;
    //     return resolve(true);
    //   }

    //   this.authService.auth().then(res => {

    //     if (!res.status) {
    //       this.global.isGuestUser = true;
    //       return resolve(true);
    //     }

    //     this.global.user = res.data.user;
    //     return resolve(true);

    //   }).catch(err => {
    //     return resolve(true);
    //   });

    // });
  }

}
