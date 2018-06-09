import { Injectable } from '@angular/core';

import { Global, UserService } from './services';
import { AUTH_HEADER } from '../constants/constants';

@Injectable()
export class InitProvider {

  constructor(
    private global: Global,
    private userService: UserService) {
  }

  load() {
    console.log('Run init data');
    return new Promise((resolve, reject) => {

      const dataLocalStorage = localStorage.getItem(AUTH_HEADER);
      if (!dataLocalStorage) {
        this.global.isGuestUser = true;
        return resolve(true);
      }

      this.userService.auth().then(data => {

        if (!data.status) {
          this.global.isGuestUser = true;
          return resolve(true);
        }

        this.global.user = data.data.user;
        return resolve(true);

      }).catch(err => {
        return resolve(true);
      });

    });
  }

}
