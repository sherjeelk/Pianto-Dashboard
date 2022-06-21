import { Component, OnInit } from '@angular/core';
import {Coupons} from '../../../models/Coupons';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Price, Pricing} from '../../../models/Pricing';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  public totalPage: number[];
  private page: any;
  public allPricing: Pricing;
  progress = false;
  public allPricingResult: Price[];
  displayedColumns: string[] = ['Id', 'Name', 'Value', 'Type'];

  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.getAllCoupons();
    this.getPageData('1');
  }

  getAllCoupons() {
    this.progress = true;
    this.api.getAllPricing().subscribe(data => {
      console.log('this is all users', data);
      this.allPricing = data;
      this.progress = false;
      this.getTotalPages();
      console.log('these are all users********', this.allPricing.results);
    }, error => {
      this.progress = false;
      console.log('An error Occurred', error);

    });
  }

  getTotalPages() {
    this.totalPage = Array(this.allPricing.totalPages).fill(0).map((x, i) => i);
    console.log('**************', this.totalPage);
  }

  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getAllPricingByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allPricing = data;
      this.allPricingResult = data.results;
    });
  }

}
