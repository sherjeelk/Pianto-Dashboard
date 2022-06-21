import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Price} from '../../../models/Pricing';
import {Payout} from '../../../models/Payouts';

@Component({
  selector: 'app-payout-details',
  templateUrl: './payout-details.component.html',
  styleUrls: ['./payout-details.component.scss']
})
export class PayoutDetailsComponent implements OnInit {
  payoutDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    bank: ['', [Validators.required]],
    swift: ['', [Validators.required]],
    user: ['', [Validators.required]],
    enable: ['', [Validators.required]],
  });
  enable = false;
  public progress = false;
  public payoutId;
  private payoutData: Payout;

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.payoutId = this.route.snapshot.paramMap.get('id');
    console.log('this is user id', this.payoutId);
    this.getPayoutDetails();
  }

  getPayoutDetails() {
    this.progress = true;
    if (this.payoutId) {
      this.api.getPayout(this.payoutId).subscribe(data => {
        this.payoutData = data;
        console.log('this is user data', this.payoutData);
        this.payoutDetailsForm.patchValue({
          name : this.payoutData.name,
          bank : this.payoutData.bank,
          swift : this.payoutData.swift,
          user: this.payoutData.user,
          enable: this.enable
        });
        this.progress = false;

      }, error => {
        console.log('an error Occurred', error);
        this.progress = false;

      });
    }
  }


  updatePayout() {
    this.progress = true;
    const body = {
      name : this.payoutDetailsForm.value.name,
      bank : this.payoutDetailsForm.value.bank,
      swift : this.payoutDetailsForm.value.swift,
      user: this.payoutDetailsForm.value.user,
      enable: this.enable

    };
    this.api.updatePayout(this.payoutId, body).subscribe(data => {
        console.log('This Price is updated successfully', data);
        this.toaster.success('Payout Updated Successfully', 'Updated');
        this.progress = false;
        this.router.navigateByUrl('payouts');
      }, error => {
        this.progress = false;
        this.util.openSnackBar(error.error.message, 'Ok');
        console.log('An error occurred while updating', error);
      }
    );
  }

  deletePayout(id) {
    this.progress = true;
    console.log('this is deletion id', id);
    this.api.deletePayout(id).subscribe(data => {
      this.toaster.success('Payout Deleted Successfully', 'Deleted');
      this.progress = false;

      this.router.navigateByUrl('/payouts');
    }, error => {
      this.progress = false;
    });
  }

}
