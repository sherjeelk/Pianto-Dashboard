import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionExpiry;

  constructor() { }

  getExpiryTime() {
    this.sessionExpiry = localStorage.getItem('session');
    console.log('this is session expiry', this.sessionExpiry);
    this.sessionExpiry = moment(this.sessionExpiry);
    console.log('this is session expiry moment time', this.sessionExpiry);
  }

}
