import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {ApiService} from '../../services/api.service';
import {User} from '../../models/UserDetail';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userId;
  userData: User;
  userDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    role: ['', [Validators.required]],
    rate: ['', [Validators.required]],
    country: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.min(8)]],
    city: ['', [Validators.required]],
    post: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  userLoaded;
  constructor(public util: UtilsService, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getUserDetails();
  }

   getUserDetails() {
    this.api.getUser(localStorage.getItem('id')).subscribe(data => {
      this.userData = data;
      this.userDetailsForm.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        country: this.userData.country,
        role: this.userData.role,
        rate: this.userData.rate,
        city : this.userData.city.toLowerCase(),
        post : this.userData.postcode,
        phone : this.userData.phone

      });
      console.log('This is user data', this.userData);
    }, error => {
      console.log('an error occurred while fetching user data', error);
    });
  }
}
