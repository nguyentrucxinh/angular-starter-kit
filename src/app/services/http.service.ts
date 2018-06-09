import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestOptionsArgs, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/finally';
import { Global } from './global';
import { AUTH_HEADER, API_URL, CONTENT_TYPE_JSON } from '../constants/constants';

export enum Action { QueryStart, QueryStop }

@Injectable()
export class HttpService {

  process: EventEmitter<any> = new EventEmitter<any>();
  authFailed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _http: Http, public global: Global) {
  }

  public getTokenFromLocalStorage(): string {
    return localStorage.getItem(AUTH_HEADER);
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this._request(RequestMethod.Get, url, null, options);
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return this._request(RequestMethod.Post, url, body, options);
  }

  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return this._request(RequestMethod.Put, url, body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this._request(RequestMethod.Delete, url, null, options);
  }

  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return this._request(RequestMethod.Patch, url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this._request(RequestMethod.Head, url, null, options);
  }

  private _request(method: RequestMethod,
    url: string, body?: string,
    options?: RequestOptionsArgs): Observable<any> {
    const requestOptions = new RequestOptions(Object.assign(
      {
        method: method,
        url: `${API_URL}${url}`,
        body: body
      },
      options
    ));

    if (!requestOptions.headers) {
      requestOptions.headers = new Headers();
    }

    requestOptions.headers.set(AUTH_HEADER, this.getTokenFromLocalStorage());
    requestOptions.headers.set('Content-Type', CONTENT_TYPE_JSON);
    requestOptions.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key');

    return Observable.create((observer) => {
      this.process.next(Action.QueryStart);
      this._http.request(new Request(requestOptions))
        .pipe(map(res => res.json()))
        // .finally(() => {
        //   this.process.next(Action.QueryStop);
        // })
        .subscribe(
          (res: Object) => {
            observer.next(res);
            observer.complete();
          },
          (err) => {
            switch (err.status) {
              case 401:
                this.authFailed.next(err);
                observer.error(err);
                break;
              default:
                observer.error(err);
                break;
            }
          }
        );
    });
  }
}
