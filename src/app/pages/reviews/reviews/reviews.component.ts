import { Component, OnInit } from '@angular/core';
import {Pricing} from '../../../models/Pricing';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Review, Reviews} from '../../../models/Reviews';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public totalPage: number[];
  private page: any;
  public allReviews: Reviews;
  progress = false;
  displayedColumns: string[] = ['Id', 'Name', 'Order', 'Rating'];
  public allReviewsResult: Review[];

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit() {
    // this.getAllReviews();
    this.getPageData(1);
  }

  getAllReviews() {
    this.progress = true;
    this.api.getAllReviews().subscribe(data => {
      console.log('this is all users', data);
      this.allReviews = data;
      this.progress = false;
      this.getTotalPages();
      console.log('these are all users********', this.allReviews.results);
    }, error => {
      this.progress = false;
      console.log('An error Occurred', error);

    });
  }

  getTotalPages() {
    this.totalPage = Array(this.allReviews.totalPages).fill(0).map((x, i) => i);
    console.log('**************', this.totalPage);

  }
  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getAllReviewsByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allReviews = data;
      this.allReviewsResult = data.results;
    });
  }

}
