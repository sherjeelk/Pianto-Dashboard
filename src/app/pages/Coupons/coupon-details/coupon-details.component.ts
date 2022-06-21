import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Coupon} from '../../../models/Coupons';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss']
})
export class CouponDetailsComponent implements OnInit {
  couponData: Coupon;
  couponId;
  enable;
  progress = false;
  couponDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    value: ['', [Validators.required]],
    type: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    enable: ['', [Validators.required]],
  });

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.couponId = this.route.snapshot.paramMap.get('id');
    console.log('this is user id', this.couponId);
    this.getCouponDetails();
  }

  getCouponDetails() {
    this.progress = true;
    if (this.couponId) {
      this.api.getCoupon(this.couponId).subscribe(data => {
        this.couponData = data;
        console.log('this is user data', this.couponData);
        this.couponDetailsForm.patchValue({
          name: this.couponData.name,
          value: this.couponData.value,
          type: this.couponData.type,
          discount: this.couponData.discount,
          enable: this.couponData.enable
        });
        this.progress = false;

      }, error => {
        console.log('an error Occurred', error);
        this.progress = false;

      });
    }
  }
  updateCoupon() {
    this.progress = true;
    const body = {
      name : this.couponDetailsForm.value.name,
      value : this.couponDetailsForm.value.value,
      type : this.couponDetailsForm.value.type,
      discount : this.couponDetailsForm.value.discount,
      enable: this.enable

    };
    this.api.updateCoupon(this.couponId, body).subscribe(data => {
        console.log('This coupon is updated successfully', data);
        this.toaster.success('Coupon Updated Successfully', 'Updated');
        this.progress = false;
        this.router.navigateByUrl('coupons');
      }, error => {
      this.progress = false;
      console.log('An error occured while updating', error);
      }
    );
  }

  postCoupon() {
    this.progress = true;
    const body = {
      name : this.couponDetailsForm.value.name,
      value : this.couponDetailsForm.value.value,
      type : this.couponDetailsForm.value.type,
      discount : this.couponDetailsForm.value.discount,
      enable: this.enable

    };
    this.api.addCoupon(body).subscribe(data => {
        console.log('This coupon is added successfully', data);
        this.toaster.success('Coupon Added Successfully', 'Added');
        this.progress = false;
        this.router.navigateByUrl('coupons');
      }, error => {
        this.progress = false;
        console.log('An error occurred while updating', error);
        this.util.openSnackBar(error.error.message, 'Ok');

      }
    );
  }


  deleteCoupon(id) {
    this.progress = true;
    console.log('this is deletion id', id);
    this.api.deleteCoupon(id).subscribe(data => {
      this.toaster.success('Coupon Deleted Successfully', 'Deleted');
      this.progress = false;

      this.router.navigateByUrl('/coupons');
    }, error => {
      this.progress = false;
    });
  }
}
