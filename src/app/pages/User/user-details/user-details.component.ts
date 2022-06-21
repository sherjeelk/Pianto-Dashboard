import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../models/UserDetail';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Extra} from '../../../models/Extras';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userData: User;
  userId;
  active;
  block;
  userDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required]],
    phone: [''],
    service: [''],
    city: [''],
    from: [''],
    till: [''],
    slotPostcode: [''],
    slotCity: [''],
    postcode: [''],
    area: [''],
    role: ['', [Validators.required]],
    rate: ['', [Validators.required]],
    country: ['', [Validators.required]],
    password: [''],
  });
  dismiss: false;
  public postCodeIsValid = false;
  public postCodeResult: any;
  public post: any;
  public postcodes: Extra[];
  public city = [];
  slotDate: any;
  slot = [];
  public disable = true;
  areaCity = [];
  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService, ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('this is user id', this.userId);
    this.getUserDetails();
  }

  getUserDetails() {
    if (this.userId) {
      this.api.getUser(this.userId).subscribe(data => {
        this.userData = data;
        // this.city = this.userData.city;
        this.slot = this.userData.slots;
        console.log('this is user data', this.userData);
        this.userDetailsForm.patchValue({
          name: this.userData.name,
          lastName: this.userData.lastName,
          email: this.userData.email,
          country: this.userData.country,
          role: this.userData.role,
          rate: this.userData.rate,
          phone: this.userData.phone,
          postcode: this.userData.postcode,
          active: this.userData.active,
          blocked: this.userData.blocked,
          calendar: this.userData.calendar,
          password: this.userData.password,
        });
      });
    }

  }

  updateUser() {
    const body = {
      email: this.userDetailsForm.value.email,
      country: this.userDetailsForm.value.country,
      name: this.userDetailsForm.value.name,
      lastName: this.userDetailsForm.value.lastName,
      role: this.userDetailsForm.value.role,
      rate: this.userDetailsForm.value.rate,
      // city: this.city,
      phone: this.userDetailsForm.value.phone,
      postcode: this.userDetailsForm.value.postcode ? this.userDetailsForm.value.postcode.toString : '',
      active: this.active,
      blocked: this.block,
      calendar: this.userDetailsForm.value.calendar,
      password: this.userDetailsForm.value.password,
      // slots: this.slot
    };
    console.log('this is body for update', body);

    this.api.updateUser(this.userId, body).subscribe(data => {
        console.log('This user is updated successfully', data);
        this.toaster.success('User Updated Successfully', 'Updated');
        this.router.navigateByUrl('/users');
      }, error => {
      this.util.openSnackBar(error.error.message, 'Ok');
      console.log('An error occured while updating', error);
      }
    );
  }

  deleteUser(id) {
    console.log('this is deletion id', id);
    this.api.deleteUser(id).subscribe(data => {
      this.toaster.success('User Deleted Successfully', 'Deleted');
      this.dismiss = false;
      this.router.navigateByUrl('/users');
    }, error => {
      this.toaster.success('An error ocurred while deleting', 'Failed');
      console.log('An error occurred while deletion', error);
      this.dismiss = false;

    });
   }

  onSearchChange(value) {
    if (value.length === 5) {
      this.disable = false;
      this.checkAvailability(value);
    } else {
      this.postCodeIsValid = false;
      this.post = '';
      this.disable = true;

    }
  }
  checkAvailability(postcode) {
    console.log('these are postcodes', postcode);
    const body = [{type: 'postcode'}, {value: postcode}];
    this.api.getAllSearchInExtras(body).subscribe(data => {
      this.postcodes = data;
      console.log('postcodes***********', this.postcodes);
      if (_.find(this.postcodes, {value: postcode})) {
        this.postCodeResult = _.find(this.postcodes, {value: postcode});
        this.postCodeIsValid = true;
        this.post = this.postCodeResult.name;
      } else {
        this.util.openSnackBar('Please enter a valid postcode', '');
        console.log('this postcode is not available');
        this.postCodeIsValid = false;
        this.post = undefined;

      }
    }, error => {
      console.log('An error occurred while fetching postcodes', error);

    });
  }

  addCity(value: string) {
    this.city.push({name : value.toLowerCase()});
  }

  removeCity(name) {
    console.log('these are city before removing', this.city);
    _.remove(this.city, {name : name.name});
  }

  saveSlot() {
    let validSlot = true;
    const from = this.userDetailsForm.value.from;
    const till = this.userDetailsForm.value.till;
    const city = this.userDetailsForm.value.area;
    const slotStartDate = moment(this.slotDate).toDate();
    slotStartDate.setHours(Number(from.split(':')[0]));
    slotStartDate.setMinutes(Number(from.split(':')[1]));

    const slotEndDate = moment(this.slotDate).toDate();
    slotEndDate.setHours(Number(till.split(':')[0]));
    slotEndDate.setMinutes(Number(till.split(':')[1]));
    if (this.slot.length > 0) {
      for (const item of this.slot) {
        const fromP = item.from;
        const tillP = item.till;
        const pFrom = moment(this.slotDate).toDate();

        pFrom.setHours(Number(fromP.split(':')[0]));
        pFrom.setMinutes(Number(fromP.split(':')[1]));
        const pTill = moment(this.slotDate).toDate();
        pTill.setHours(Number(tillP.split(':')[0]));
        pTill.setMinutes(Number(tillP.split(':')[1]));
        const invalid = (moment(slotEndDate).isSameOrBefore(slotStartDate) || moment(pTill).isBetween(slotStartDate, slotEndDate)
          || moment(pFrom).isBetween(slotStartDate, slotEndDate) || moment(pTill).isSame(slotEndDate) || moment(pTill).isSame(slotStartDate)
          || moment(pFrom).isSame(slotStartDate) || moment(pFrom).isSame(slotEndDate));

        console.log('Invalid', invalid);
        if (invalid){
          this.util.openSnackBar('Your slot overlap with existing slot or time is invalid!', 'ok');
          validSlot = false;
          return true;
        }

      }
      if (validSlot) {
        this.slot.push({
          date: moment(this.slotDate).toDate().toISOString(),
          from: this.userDetailsForm.value.from,
          till: this.userDetailsForm.value.till,
          city: this.userDetailsForm.value.area,
          available: true
        });

      }



    } else {
      if (moment(slotEndDate).isSameOrBefore(slotStartDate)) {
        this.util.openSnackBar('Your slot overlap with existing slot or time is invalid!', 'ok');
      } else {
        this.slot.push({
          date: moment(this.slotDate).toDate().toISOString(),
          from: this.userDetailsForm.value.from,
          till: this.userDetailsForm.value.till,
          city: this.userDetailsForm.value.area,
          available: true
        });
      }
    }


    console.log('these are slots', this.slot);
  }

  removeSlot(item: any) {
    console.log('these are city before removing', this.slot);

    _.remove(this.slot, {date: item.date, from: item.from, till: item.till});
    console.log('these are city after removing', this.slot);

  }

  addCityForArea(post: any) {
    if (this.areaCity.includes(post.toLowerCase())) {
      console.log('This city already exist in array', this.areaCity);
      // this.util.openSnackBar('This city already exist');

    } else {
      this.areaCity.push(post.toLowerCase());
      console.log('this is new array', this.areaCity);
      // this.util.openSnackBar( post + ' added in area');
    }
  }

  saveArea(value: string) {
    if (value.trim().length > 0) {
      console.log('this is city of user', this.userData.city);
      const currentCities = this.userData.city;
      const similar = _.filter(currentCities, ['name', value.toLowerCase().trim()]);
      if (similar.length === 0) {
        console.log('these are similar area', similar);
        const  areaBody = {name: value.toLowerCase().trim(), data : this.areaCity};
        currentCities.push(areaBody);
        // const currentCities = [];
        this.api.updateUser(this.userData.id, {city: currentCities}).subscribe( data => {
          this.userData = data;
          console.log('Area updated in user', data);
          // this..openSnackBar('Area added successfully');

          this.areaCity = [];
        }, error => {
          // this.util.openSnackBar('Error occurred please try again');
        });
      } else {
        console.log('Cannot add same name area');
        // this.util.openSnackBar('You cannot add area with same name');

      }

    } else {
      console.log('Cannot add blank name');
      // this.util.openSnackBar('You cannot add a blank name');

    }

  }

  removeAreaCity(town: any) {
    this.areaCity = this.areaCity.filter(e => e !== town); // will return ['A', 'C']
    // this.util.openSnackBar('Removed ' + town );
  }

  deleteArea(area: string) {
    // console.log('this is city of user', this.session.getUser().city);
    const currentCities = this.userData.city;
    _.remove(currentCities, area);
    // const currentCities = [];
    this.api.updateUser(this.userData.id, {city: currentCities}).subscribe( data => {
      this.userData = data;
      // this.util.openSnackBar('Removed ' + area );

      this.areaCity = [];
    }, error => {
      console.log('An error occrurred while adding area');
    });
  }

}
