import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../../services/utils.service';
import {ApiService} from '../../../services/api.service';
import {Setting, Settings} from '../../../models/settings';
import {Coupons} from '../../../models/Coupons';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public allSettings: Settings;
  public settingsId;
  public totalPage: number[];
  public page: any;
  progress = false;
  public allSettingsResult: Setting[];
  displayedColumns: string[] = ['Id', 'Name', 'Value', 'Type'];

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit() {
    // this.getAllSettings();
    this.getPageData('1');
  }

  getAllSettings() {
    this.progress = true;
    this.api.getAllSettings().subscribe(data => {
      this.allSettings = data;
      this.getTotalPages();
      console.log('these are all settings', this.allSettings.results);
      this.progress = false;
    }, error => {
      this.progress = false;
    });
  }


  getTotalPages() {
    this.totalPage = Array(this.allSettings.totalPages).fill(0).map((x, i) => i);
    console.log('**************', this.allSettings);

  }
  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getAllSettingsByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allSettings = data;
      this.allSettingsResult = data.results;
    });
  }

}
