import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Services} from '../../../models/Services';
import {Service} from '../../../models/Orders';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public allServices: Services;
  public serviceId;
  public page: any;
  public totalPage: number[];
  progress = false;
  allServiceResults: Service[];
  displayedColumns: string[] = ['Id', 'Name', 'Price', 'Type'];

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit() {
    this.getAllServices();
    this.getPageData(1);
  }

  getAllServices() {
    this.progress = true;
    this.api.getAllServices().subscribe(data => {
      console.log('this is all users', data);
      this.allServices = data;
      this.getTotalPages();
      this.progress = false;
      console.log('these are all users********', this.allServices.results);
    });
  }
  getTotalPages() {
    this.totalPage = Array(this.allServices.totalPages).fill(0).map((x, i) => i);
    console.log('**************', this.totalPage);

  }
  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getAllServicesByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allServices = data;
      this.allServiceResults = data.results;
    });
  }

}
