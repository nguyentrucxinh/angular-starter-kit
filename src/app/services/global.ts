import { Injectable } from '@angular/core';
import { User } from './../models/models';

@Injectable()
export class Global {

  user: User;
  isGuestUser: boolean;
}
