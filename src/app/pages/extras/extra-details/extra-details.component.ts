import { Component, OnInit } from '@angular/core';
import {Price} from '../../../models/Pricing';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Extra} from '../../../models/Extras';

@Component({
  selector: 'app-extra-details',
  templateUrl: './extra-details.component.html',
  styleUrls: ['./extra-details.component.scss']
})
export class ExtraDetailsComponent implements OnInit {
  extrasData: Extra;
  extrasId;
  enable;
  progress = false;
  extraDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    name_fi: ['', [Validators.required]],
    type: ['', [Validators.required]],
    value: ['', [Validators.required]],
    valueNum: ['', [Validators.required]],
    enable: ['', [Validators.required]],
  });

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.extrasId = this.route.snapshot.paramMap.get('id');
    console.log('this is user id', this.extrasId);
    this.getPriceDetails();
  }

  getPriceDetails() {
    this.progress = true;
    if (this.extrasId) {
      this.api.getExtra(this.extrasId).subscribe(data => {
        this.extrasData = data;
        console.log('this is user data', this.extrasData);
        this.extraDetailsForm.patchValue({
          name: this.extrasData.name,
          name_fi: this.extrasData.name_fi,
          value: this.extrasData.value,
          type: this.extrasData.type,
          valueNum: this.extrasData.valueNum,
          enable: this.extrasData.enable
        });
        this.progress = false;

      }, error => {
        console.log('an error Occurred', error);
        this.progress = false;

      });
    }
  }
  updateExtra() {
    this.progress = true;
    const body = {
      name : this.extraDetailsForm.value.name,
      name_fi : this.extraDetailsForm.value.name_fi,
      value : this.extraDetailsForm.value.value,
      type : this.extraDetailsForm.value.type,
      valueNum: this.extraDetailsForm.value.valueNum,
      enable: this.enable

    };
    this.api.updateExtra(this.extrasId, body).subscribe(data => {
        console.log('This Extra is updated successfully', data);
        this.toaster.success('Extra Updated Successfully', 'Updated');
        this.progress = false;
        this.router.navigateByUrl('extras');
      }, error => {
        this.progress = false;
        this.util.openSnackBar(error.error.message, 'Ok');
        console.log('An error occurred while updating', error);
      }
    );
  }

  deleteExtra(id) {
    this.progress = true;
    console.log('this is deletion id', id);
    this.api.deleteExtra(id).subscribe(data => {
      this.toaster.success('Extra Deleted Successfully', 'Deleted');
      this.progress = false;

      this.router.navigateByUrl('/extras');
    }, error => {
      this.progress = false;
    });
  }
}
