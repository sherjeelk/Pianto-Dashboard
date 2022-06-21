import { Component, OnInit } from '@angular/core';
import {Pricing} from '../../../models/Pricing';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Payout, Payouts} from '../../../models/Payouts';

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.scss']
})
export class PayoutsComponent implements OnInit {
  public totalPage: number[];
  private page: any;
  public allPayouts: Payouts;
  progress = false;
  displayedColumns: string[] = ['Id', 'Name', 'Bank', 'Swift'];
  public allPayoutsResults: Payout[];

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit() {
    // this.getAllCoupons();
    this.getPageData(1);
  }

  getAllCoupons() {
    this.progress = true;
    this.api.getAllPayouts().subscribe(data => {
      console.log('this is all users', data);
      this.allPayouts = data;
      this.progress = false;
      this.getTotalPages();
      console.log('these are all users********', this.allPayouts.results);
    }, error => {
      this.progress = false;
      console.log('An error Occurred', error);

    });
  }

  getTotalPages() {
    this.totalPage = Array(this.allPayouts.totalPages).fill(0).map((x, i) => i);
    console.log('**************', this.totalPage);

  }
  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getAllPayoutsByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allPayouts = data;
      this.allPayoutsResults = data.results;
    });
  }

}
