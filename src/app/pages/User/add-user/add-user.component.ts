import { Component, OnInit } from '@angular/core';
import {AllUser, User} from '../../../models/UserDetail';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Extra} from '../../../models/Extras';
import {MatDatepicker} from '@angular/material/datepicker';
import {NgxTimepickerFieldComponent} from 'ngx-material-timepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userData: User;
  userId;
  disable = true;
  userDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required]],
    phone: [''],
    service: [''],
    city: [''],
    from: [''],
    till: [''],
    slotCity: [''],
    slotPostcode: [''],
    postcode: [''],
    role: ['', [Validators.required]],
    rate: ['', [Validators.required]],
    country: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.min(8)]],
  });
  public postCodeIsValid = false;
  public postCodeResult: any;
  public post: any;
  public postcodes: Extra[];
  public city = [];
  slotDate: any;
  slot = [];
  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  postUser() {
    const body = {
      email : this.userDetailsForm.value.email,
      country : this.userDetailsForm.value.country,
      name : this.userDetailsForm.value.name,
      phone : this.userDetailsForm.value.phone,
      lastName : this.userDetailsForm.value.lastName,
      role : this.userDetailsForm.value.role,
      rate : this.userDetailsForm.value.rate,
      service : this.userDetailsForm.value.service,
      password : this.userDetailsForm.value.password,
      postcode : this.userDetailsForm.value.postcode.toString,
      city : this.city,
      slots : this.slot,
      used: true
    };
    this.api.addUser(body).subscribe(data => {
        console.log('This user is updated successfully', data);
        this.toaster.success('User Updated Successfully', 'Updated');
        this.router.navigateByUrl('users');
      }, error => {
        console.log('An error occurred while updating', error);
        this.util.openSnackBar(error.error.message, 'Ok');

      }
    );
  }
  onSearchChange(value) {
    if (value.length === 5) {
      this.checkAvailability(value);
      this.disable = false;

    } else {
      this.disable = true;
      this.postCodeIsValid = false;
      this.post = undefined;

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
        this.disable = true;
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
    const city = this.userDetailsForm.value.slotCity.toLowerCase();
    const slotStartDate = moment(this.slotDate).toDate();
    slotStartDate.setHours(Number(from.split(':')[0]));
    slotStartDate.setMinutes(Number(from.split(':')[1]));

    console.log('this is start date', slotStartDate);

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
          || moment(pFrom).isSame(slotStartDate) || moment(pFrom).isSame(slotEndDate)) && (item.city === city);

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
          city: this.userDetailsForm.value.slotCity.toLowerCase(),
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
          city: this.userDetailsForm.value.slotCity.toLowerCase(),
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

}
