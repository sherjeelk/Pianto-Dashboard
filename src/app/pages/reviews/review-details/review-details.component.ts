import { Component, OnInit } from '@angular/core';
import {Price} from '../../../models/Pricing';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Review} from '../../../models/Reviews';
import * as moment from 'moment';
import * as _ from 'lodash';
import {StarRatingComponent} from 'ng-starrating';
import {Extra} from '../../../models/Extras';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss']
})
export class ReviewDetailsComponent implements OnInit {
  reviewData: Review;
  reviewId;
  enable;
  progress = false;
  reviewDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    comment: ['', [Validators.required]],
    rating: ['', [Validators.required]],
    user: ['', [Validators.required]],
    order: ['', [Validators.required]],
    attributes: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });
  slotDate: any;
  attribute = [];
  public reviewType: Extra[] = [];

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.reviewId = this.route.snapshot.paramMap.get('id');
    console.log('this is user id', this.reviewId);
    this.getReviewDetails();
  }

  getReviewDetails() {
    this.progress = true;
    if (this.reviewId) {
      this.api.getReviews(this.reviewId).subscribe(data => {
        this.reviewData = data;
        this.reviewType = data.attributes;
        if (this.reviewType.length > 0) {

        } else {
          this.getReviewType();
        }
        console.log('this is user data', this.reviewData);
        this.reviewDetailsForm.patchValue({
          name: this.reviewData.name,
          comment: this.reviewData.comment,
          rating: this.reviewData.rating,
          order: this.reviewData.order,
          user: this.reviewData.user,
          attributes: this.reviewData.attributes,
        });
        this.slotDate = moment(this.reviewData.date).toDate();
        this.progress = false;

      }, error => {
        console.log('an error Occurred', error);
        this.progress = false;

      });
    }
  }
  updateReview() {
    this.progress = true;
    const body = {
      name: this.reviewDetailsForm.value.name,
      comment: this.reviewDetailsForm.value.comment,
      rating: this.reviewDetailsForm.value.rating,
      order: this.reviewDetailsForm.value.order,
      attributes: this.attribute,
      enable: this.enable

    };
    this.api.updateReview(this.reviewId, body).subscribe(data => {
        console.log('This reviews is updated successfully', data);
        this.toaster.success('Review Updated Successfully', 'Updated');
        this.progress = false;
        this.router.navigateByUrl('reviews');
      }, error => {
        this.progress = false;
        this.util.openSnackBar(error.error.message, 'Ok');
        console.log('An error occurred while updating', error);
      }
    );
  }

  deleteReview(id) {
    this.progress = true;
    console.log('this is deletion id', id);
    this.api.deleteReview(id).subscribe(data => {
      this.toaster.success('Review Deleted Successfully', 'Deleted');
      this.progress = false;

      this.router.navigateByUrl('/reviews');
    }, error => {
      this.progress = false;
    });
  }

  onRate($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }, name, id) {
    let existing = [];

    // Check for existing item
    existing = _.filter(this.reviewData.attributes, {name});
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

  getReviewType() {
    this.api.getAllReviewsType().subscribe(data => {
      this.reviewType = data.results;
      console.log('these are review types', this.reviewType);

    }, error => {
      console.log('an error occurred while getting reviews type', error);
    });
  }

}
