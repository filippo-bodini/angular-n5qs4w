import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  isProduction: boolean;

  constructor() {
    this.isProduction = environment.production;
  }

  public warn(message): void {
    if (!this.isProduction) {
      console.warn(message);
    }
  }

  public log(message): void {
    if (!this.isProduction) {
      console.log(message);
    }
  }

  public error(message): void {
    if (!this.isProduction) {
      console.error(message);
    }
  }
}
