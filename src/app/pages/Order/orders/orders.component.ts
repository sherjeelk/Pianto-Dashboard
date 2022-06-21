import { Component, OnInit } from '@angular/core';
import {AllUser} from '../../../models/UserDetail';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {Order, Orders} from '../../../models/Orders';
import {UtilsService} from '../../../services/utils.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public allOrders: Orders;
  public userId;
  public totalPage: number[];
  public page: any;
  asc = false;
  i;
  progress = false;
  displayedColumns: string[] = ['Id', 'Customer', 'Model', 'Assigned', 'City'];
  public allOrdersResult: Order[];
  public focus;


  constructor(private api: ApiService, private toaster: ToastrService, public util: UtilsService) { }

  ngOnInit() {
    // this.getAllUsers();
    this.getPageData(1);
    this.util.searchedOrders = [];
  }

  getAllUsers() {
    this.progress = true;
    this.api.getAllOrders().subscribe(data => {
      console.log('this is all orders', data);
      this.allOrders = data;
      this.getTotalPages();
      this.progress = false;

      // this.filterData( 'email' , 'jai');
      console.log('these are all users********', this.allOrders.results);
    }, error => {
      this.progress = false;

    });
  }

  getTotalPages() {
    this.totalPage = Array(this.allOrders.totalPages).fill(0).map((x, i) => i);
    console.log('**************', this.totalPage);

  }

  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getOrdersByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allOrders = data;
      this.allOrdersResult = data.results;
    });
  }

  sortData(data) {
    this.asc = !this.asc;
    if (this.asc) {
      this.i = 'asc';
    } else {
      this.i = 'desc';
    }
    this.allOrders.results = _.orderBy(this.allOrders.results, [user => user[data]], [this.i]);
  }
  filterData(data , query){
    this.allOrders.results = _.filter(this.allOrders.results, person => person[data] === query);

  }
}


