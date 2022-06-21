import { Component, OnInit } from '@angular/core';
import {Setting} from '../../../models/settings';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-settings',
  templateUrl: './add-settings.component.html',
  styleUrls: ['./add-settings.component.scss']
})
export class AddSettingsComponent implements OnInit {
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
        this.util.openSnackBar(error.error.message, 'Ok');
      }
    );
  }

}
