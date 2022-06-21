import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/UserDetail';
import {FormBuilder, Validators} from '@angular/forms';
import {Extra} from '../../../models/Extras';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
import * as _ from 'lodash';
import {StarRatingComponent} from 'ng-starrating';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  userData: User;
  userId;
  addReviewForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    comment: [''],
    rating: ['', [Validators.required]],
    user: [''],
    order: [''],
    attributes: [''],
    date: [''],
    enable: [''],
  });
  public postCodeIsValid = false;
  public postCodeResult: any;
  public post: any;
  public postcodes: Extra[];
  public city = [];
  slotDate: any;
  slot = [];
  public reviewType: Extra[] = [];
  attribute = [];

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getReviewType();

  }

  addReview() {
    const body = {
      comment : this.addReviewForm.value.comment,
      name : this.addReviewForm.value.name,
      rating : this.addReviewForm.value.rating,
      user : this.addReviewForm.value.user,
      order : this.addReviewForm.value.order,
      attributes : this.attribute,
      date : moment(this.slotDate).toDate(),
      enable : true,
    };
    console.log('this is review body', body);
    this.api.addReview(body).subscribe(data => {
        console.log('This review is updated successfully', data);
        this.toaster.success('User Updated Successfully', 'Updated');
        this.router.navigateByUrl('reviews');
      }, error => {
        console.log('An error occurred while updating', error);
        this.util.openSnackBar(error.error.message, 'Ok');

      }
    );
  }
  onSearchChange(value) {
    if (value.length === 5) {
      this.checkAvailability(value);
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
    this.city.push({name : value});
  }
  // Get reviews type
  getReviewType() {
    this.api.getAllReviewsType().subscribe(data => {
      this.reviewType = data.results;
      console.log('these are review types', this.reviewType);

    }, error => {
      console.log('an error occurred while getting reviews type', error);
    });
  }

  onRate($event: {oldValue: number; newValue: number; starRating: StarRatingComponent}, name: string, id: string) {
    let existing = [];

    // Check for existing item

    existing = _.filter(this.attribute, {name});
    console.log('existing item', existing);
    if (existing.length > 0) {
      const omit = _.remove(this.attribute, item => item.name === name);
      console.log('removed existing item', omit);
      this.attribute.push({name, rating: $event.newValue, _id: id});
      console.log('Pushed new value', this.attribute);
    } else {
      this.attribute.push({name, rating: $event.newValue, _id: id});
      console.log('brand new value', this.attribute);

    }
  }

}
