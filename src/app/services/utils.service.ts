import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {ClipboardService} from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';
import {ApiService} from './api.service';
import {Order} from '../models/Orders';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public auth = new BehaviorSubject<boolean>(null);

  public user = {
    userNAme : '',
    email: '',
    role: '',
    id: ''
  };
  public searchedOrders: Order[] = [];
  public searchProgress = false;
  constructor(private router: Router, private clipboardService: ClipboardService,
              private snackBar: MatSnackBar, private api: ApiService,  private toaster: ToastrService) {
    this.initUserData();
  }
  userName: string;
  getUserName() {
    this.userName =  localStorage.getItem('name');
    return this.userName;
  }


  public async initUserData() {
    try {
      this.user.userNAme =  localStorage.getItem('name');
      this.user.email =  localStorage.getItem('email');
      this.user.role =  localStorage.getItem('role');
      this.user.id =  localStorage.getItem('id');
      console.log('this is user data for auth', this.user);
      if (this.user.email === null) {
        this.auth.next(false);
      }
      else if (this.user.email.length > 2){
        this.auth.next(true);
      } else {
        this.auth.next(false);
      }
      console.log('this is auth value', this.auth);
      console.log('this is auth value', this.auth);
    } catch (e) {
      console.log('An error occurred while loading user data', e);
      this.auth.next(false);
    }

  }

  logout() {
    localStorage.clear();
    localStorage.setItem('email', 'x');
    this.router.navigateByUrl('/login');
  }

  copy(text: string) {
    this.clipboardService.copy(text);
    this.openSnackBar('Id Copied to clipboard', 'ok');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });

  }

  public getHumanShortDate(date) {
    return moment(date).format('DD-MMM-YYYY');
  }

  public checkValidDate(date) {
    console.log('this is date in util',  moment(date).isValid());
    return moment(date).isValid();
  }

  searchOrders(value: string) {
    if (value.trim() !== '') {
      const body = {searchKey : 'name', search: value};
      this.searchProgress = true;
      this.api.getAllSearchInOrder(body).subscribe(data => {
        if (data.length > 0) {
          this.searchedOrders = data;
          this.searchProgress = false;
          console.log('This is matching orders', data);

        } else {
          this.searchedOrders = [];
        }

      }, error => {
        console.log('error occurred while searching orders', error);
      });
    } else {
      this.searchedOrders = [];
    }

  }
}
