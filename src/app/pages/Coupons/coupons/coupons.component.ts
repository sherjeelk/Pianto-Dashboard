import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Coupon, Coupons} from '../../../models/Coupons';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
public couponId;
  public totalPage: number[];
  private page: any;
  public allCoupons: Coupons;
  progress = false;
  displayedColumns: string[] = ['Id', 'Name', 'Discount', 'Type', 'Value'];
  public allCouponsResults: Coupon[];

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit() {
    // this.getAllCoupons();
    this.getPageData(1);
  }

  getAllCoupons() {
    this.progress = true;
    this.api.getAllCoupons().subscribe(data => {
      console.log('this is all users', data);
      this.allCoupons = data;
      this.progress = false;
      this.getTotalPages();
      console.log('these are all users********', this.allCoupons.results);
    }, error => {
      this.progress = false;
      console.log('An error Occurred', error);

    });
  }

  getTotalPages() {
    this.totalPage = Array(this.allCoupons.totalPages).fill(0).map((x, i) => i);
    console.log('**************', this.totalPage);

  }
  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getAllCouponsByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allCoupons = data;
      this.allCouponsResults = data.results;
    });
  }

}
