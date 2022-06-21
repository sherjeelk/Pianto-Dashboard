import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Setting} from '../../../models/settings';

@Component({
  selector: 'app-settings-details',
  templateUrl: './settings-details.component.html',
  styleUrls: ['./settings-details.component.scss']
})
export class SettingsDetailsComponent implements OnInit {
  settingData: Setting;
  settingId;
  enable;
  settingDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    value: ['', [Validators.required]],
    type: ['', [Validators.required]],
    enable: ['', [Validators.required]],
  });

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.settingId = this.route.snapshot.paramMap.get('id');
    console.log('this is user id', this.settingId);
    this.getSettingDetails();
  }

  getSettingDetails() {
    if (this.settingId) {
      this.api.getSetting(this.settingId).subscribe(data => {
        this.settingData = data;
        console.log('this is user data', this.settingData);
        this.enable = this.settingData.enable;
        this.settingDetailsForm.patchValue({
          name: this.settingData.name,
          value: this.settingData.value,
          type: this.settingData.type,
          enable: this.settingData.enable
        });
      });
    }

  }
  updateSetting() {
    const body = {
      name : this.settingDetailsForm.value.name,
      value : this.settingDetailsForm.value.value,
      type : this.settingDetailsForm.value.type,
      enable : this.enable,
    };
    this.api.updateSetting(this.settingId, body).subscribe(data => {
        console.log('This setting is updated successfully', data);
        this.toaster.success('setting Updated Successfully', 'Updated');
        this.router.navigateByUrl('settings');
      }, error => {
      this.util.openSnackBar(error.error.message, 'Ok');

      console.log('An error occureed while updating', error);
      }
    );
  }

  postSetting() {
    const body = {
      name : this.settingDetailsForm.value.name,
      value : this.settingDetailsForm.value.value,
      type : this.settingDetailsForm.value.type,
      enable : this.settingDetailsForm.value.discount,
    };
    this.api.addSetting(body).subscribe(data => {
        console.log('This setting is added successfully', data);
        this.toaster.success('setting Added Successfully', 'Added');
        this.router.navigateByUrl('settings');
      }, error => {
        console.log('An error occurred while updating', error);
      }
    );
  }
  deleteSetting(id) {
    console.log('this is deletion id', id);
    this.api.deleteSetting(id).subscribe(data => {
      this.toaster.success('Setting Deleted Successfully', 'Deleted');
      this.router.navigateByUrl('/settings');
    }, error => {

    });
  }

}
