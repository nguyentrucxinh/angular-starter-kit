import { AUTH_HEADER, AUTH_TOKEN_TYPE } from '../constants/constants';

export class LocalStorageHelper {

  static get(key: string): string {
    return localStorage.getItem(key);
  }

  static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static getAuthorization(): string {
    return localStorage.getItem(AUTH_HEADER);
  }

  static setAuthorization(value: string): void {
    localStorage.setItem(AUTH_HEADER, `${AUTH_TOKEN_TYPE} ${value}`);
  }

  static removeAuthorization(): void {
    localStorage.removeItem(AUTH_HEADER);
  }
}
