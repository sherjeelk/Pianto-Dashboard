import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {log} from 'util';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });


  constructor(public api: ApiService, private http: HttpClient, private formBuilder: FormBuilder, private router: Router,
              private util: UtilsService, private session: SessionService) {}

  ngOnInit() {
    this.checkLogin();
    console.log('checksession',  localStorage.getItem('session'));
  }
  ngOnDestroy() {
  }

  async login() {
    await localStorage.clear();
    try {
      const loginResponse =  await this.api.login(this.loginForm.value.email, this.loginForm.value.password).toPromise();
      if (loginResponse.tokens.access) {
        await this.saveInfo(loginResponse);
        this.router.navigateByUrl('/dashboard');
      }
      console.log('this is login response', loginResponse.tokens.access.token);
    } catch (e) {
      // Now call msg service and there should be an special dialog for error this.msgService.showError(e.msg)
    }
  }

  async saveInfo(data){
    console.log('this is login data', data );
    await localStorage.setItem('token', data.tokens.access.token);
    await localStorage.setItem('name', data.user.name);
    await localStorage.setItem('email', data.user.email);
    await localStorage.setItem('role', data.user.role);
    await localStorage.setItem('id', data.user.id);
    await localStorage.setItem('session', data.tokens.access.expires);
    this.api.setHeaders();
    await this.session.getExpiryTime();
    await this.util.initUserData();
  }

  async checkLogin() {
    const email = await localStorage.getItem('email') ;
    if (email === null) {
      this.router.navigateByUrl('/login');

    }else if (email.length > 2) {
      console.log('i want to change route');
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');

    }
  }
}
