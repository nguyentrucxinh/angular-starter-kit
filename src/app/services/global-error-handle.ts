import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: Error) {
    // Do whatever you like with the error (send it to the server?)
    // And log it to the console
    console.error('GlobalErrorHandler: ', error);
  }
}
