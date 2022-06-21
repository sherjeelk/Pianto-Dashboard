import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-pricing',
  templateUrl: './add-pricing.component.html',
  styleUrls: ['./add-pricing.component.scss']
})
export class AddPricingComponent implements OnInit {
  priceDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    name_fi: ['', [Validators.required]],
    type: ['', [Validators.required]],
    value: ['', [Validators.required]],
    description: ['', [Validators.required]],
    enable: ['', [Validators.required]],
  });
  enable = false;

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  postPricing() {
    const body = {
      name : this.priceDetailsForm.value.name,
      name_fi : this.priceDetailsForm.value.name,
      value : this.priceDetailsForm.value.value,
      type : this.priceDetailsForm.value.type,
      description : this.priceDetailsForm.value.description,
      enable : this.enable,
    };
    this.api.addPricing(body).subscribe( data => {
      console.log('This Price is updated successfully', data);
      this.toaster.success('Price added Successfully', 'Added');
      this.router.navigateByUrl('/pricing');
    }, error => {
      this.util.openSnackBar(error.error.message, 'Ok');
      console.log('An error occurred while updating', error);
    });
  }
}
