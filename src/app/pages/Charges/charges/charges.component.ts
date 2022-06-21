import { Component, OnInit } from '@angular/core';
import {Pricing} from '../../../models/Pricing';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Charge, Charges} from '../../../models/Charges';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss']
})
export class ChargesComponent implements OnInit {
  public ChargeId;
  public totalPage: number[];
  private page: any;
  public allCharges: Charges;
  progress = false;
  displayedColumns: string[] = ['Id', 'Name', 'Value', 'Type'];
  public allChargesResult: Charge[];

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit() {
    // this.getAllCharges();
    this.getPageData(1);
  }

  getAllCharges() {
    this.progress = true;
    this.api.getAllCharges().subscribe(data => {
      console.log('this is all users', data);
      this.allCharges = data;
      this.progress = false;
      this.getTotalPages();
      console.log('these are all users********', this.allCharges.results);
    }, error => {
      this.progress = false;
      console.log('An error Occurred', error);

    });
  }

  getTotalPages() {
    this.totalPage = Array(this.allCharges.totalPages).fill(0).map((x, i) => i);
    console.log('**************', this.totalPage);

  }
  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getAllChargesByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allCharges = data;
      this.allChargesResult = data.results;
    });
  }

}
