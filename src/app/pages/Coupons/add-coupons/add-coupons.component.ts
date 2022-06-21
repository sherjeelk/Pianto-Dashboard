import { Component, OnInit } from '@angular/core';
import {Coupon} from '../../../models/Coupons';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrls: ['./add-coupons.component.scss']
})
export class AddCouponsComponent implements OnInit {
  couponData: Coupon;
  couponDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    value: ['', [Validators.required]],
    type: ['', [Validators.required]],
    discount: ['', [Validators.required]],
  });

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  postCoupon() {
    const body = {
      name : this.couponDetailsForm.value.name,
      value : this.couponDetailsForm.value.value,
      type : this.couponDetailsForm.value.type,
      discount : this.couponDetailsForm.value.discount,
    };
    this.api.addCoupon(body).subscribe(data => {
        console.log('This coupon is added successfully', data);
        this.toaster.success('Coupon Added Successfully', 'Added');
        this.router.navigateByUrl('coupons');
      }, error => {
        console.log('An error occurred while updating', error);
        this.util.openSnackBar(error.error.message, 'Ok');

      }
    );
  }
}
