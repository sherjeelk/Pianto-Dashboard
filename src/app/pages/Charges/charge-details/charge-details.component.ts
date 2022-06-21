import { Component, OnInit } from '@angular/core';
import {Price} from '../../../models/Pricing';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Charge} from '../../../models/Charges';

@Component({
  selector: 'app-charge-details',
  templateUrl: './charge-details.component.html',
  styleUrls: ['./charge-details.component.scss']
})
export class ChargeDetailsComponent  implements OnInit {
  chargeData: Charge;
  chargeId;
  enable;
  progress = false;
  chargeDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    name_fi: ['', [Validators.required]],
    type: ['', [Validators.required]],
    value: ['', [Validators.required]],
    description: ['', [Validators.required]],
    enable: ['', [Validators.required]],
    amountType: ['', [Validators.required]],
  });

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.chargeId = this.route.snapshot.paramMap.get('id');
    console.log('this is user id', this.chargeId);
    this.getChargeDetails();
  }

  getChargeDetails() {
    this.progress = true;
    if (this.chargeId) {
      this.api.getCharges(this.chargeId).subscribe(data => {
        this.chargeData = data;
        console.log('this is user data', this.chargeData);
        this.chargeDetailsForm.patchValue({
          name: this.chargeData.name,
          name_fi: this.chargeData.name_fi,
          value: this.chargeData.value,
          type: this.chargeData.type,
          description: this.chargeData.description,
          amountType: this.chargeData.amountType,
          enable: this.chargeData.enable
        });
        this.progress = false;

      }, error => {
        console.log('an error Occurred', error);
        this.progress = false;

      });
    }
  }
  updateCherges() {
    const body = {
      name : this.chargeDetailsForm.value.name,
      name_fi : this.chargeDetailsForm.value.name_fi,
      value : this.chargeDetailsForm.value.value,
      type : this.chargeDetailsForm.value.type,
      description: this.chargeDetailsForm.value.description,
      amountType: this.chargeDetailsForm.value.amountType,
      enable: this.enable

    };
    this.progress = true;
    if (this.chargeDetailsForm.valid) {
      this.api.updateCharges(this.chargeId, body).subscribe(data => {
          console.log('This Charge is updated successfully', data);
          this.toaster.success('Charge Updated Successfully', 'Updated');
          this.progress = false;
          this.router.navigateByUrl('charges');
        }, error => {
          this.progress = false;
          this.util.openSnackBar(error.error.message, 'Ok');
          console.log('An error occurred while updating', error);
        }
      );
    } else {
      this.util.openSnackBar('Please correct form errors first', '');
    }


  }

  deleteCharges(id) {
    this.progress = true;
    console.log('this is deletion id', id);
    this.api.deleteCharge(id).subscribe(data => {
      this.toaster.success('Charge Deleted Successfully', 'Deleted');
      this.progress = false;

      this.router.navigateByUrl('/charges');
    }, error => {
      this.progress = false;
    });
  }
}
