import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Price} from '../../../models/Pricing';

@Component({
  selector: 'app-pricing-details',
  templateUrl: './pricing-details.component.html',
  styleUrls: ['./pricing-details.component.scss']
})
export class PricingDetailsComponent  implements OnInit {
  pricingData: Price;
  priceId;
  enable = false;
  progress = false;
  priceDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    value: ['', [Validators.required]],
    description: ['', [Validators.required]],
    enable: ['', [Validators.required]],
  });

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.priceId = this.route.snapshot.paramMap.get('id');
    console.log('this is user id', this.priceId);
    this.getPriceDetails();
  }

  getPriceDetails() {
    this.progress = true;
    if (this.priceId) {
      this.api.getPricing(this.priceId).subscribe(data => {
        this.pricingData = data;
        console.log('this is user data', this.pricingData);
        this.priceDetailsForm.patchValue({
          name: this.pricingData.name,
          name_fi: this.pricingData.name_fi,
          value: this.pricingData.value,
          type: this.pricingData.type,
          description: this.pricingData.description,
          enable: this.pricingData.enable
        });
        this.progress = false;
        }, error => {
        console.log('an error Occurred', error);
        this.progress = false;
      });
    }
  }

  updatePricing() {
    this.progress = true;
    const body = {
      name : this.priceDetailsForm.value.name,
      name_fi : this.priceDetailsForm.value.name_fi,
      value : this.priceDetailsForm.value.value,
      type : this.priceDetailsForm.value.type,
      description: this.priceDetailsForm.value.description,
      enable: this.enable

    };
    this.api.updatePricing(this.priceId, body).subscribe(data => {
        console.log('This Price is updated successfully', data);
        this.toaster.success('Price Updated Successfully', 'Updated');
        this.progress = false;
        this.router.navigateByUrl('pricing');
      }, error => {
        this.progress = false;
        this.util.openSnackBar(error.error.message, 'Ok');
        console.log('An error occurred while updating', error);
      }
    );
  }

  deletePricing(id) {
    this.progress = true;
    console.log('this is deletion id', id);
    this.api.deletePrice(id).subscribe(data => {
      this.toaster.success('Price Deleted Successfully', 'Deleted');
      this.progress = false;

      this.router.navigateByUrl('/pricing');
    }, error => {
      this.progress = false;
    });
  }
}
