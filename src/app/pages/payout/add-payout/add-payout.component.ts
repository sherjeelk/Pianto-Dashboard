import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-payout',
  templateUrl: './add-payout.component.html',
  styleUrls: ['./add-payout.component.scss']
})
export class AddPayoutComponent implements OnInit {
  payoutDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    bank: ['', [Validators.required]],
    swift: ['', [Validators.required]],
    user: ['', [Validators.required]],
    enable: ['', [Validators.required]],
  });
  enable = false;

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  postPayout() {
    const body = {
      name : this.payoutDetailsForm.value.name,
      bank : this.payoutDetailsForm.value.bank,
      swift : this.payoutDetailsForm.value.swift,
      user : this.payoutDetailsForm.value.user,
      enable : this.enable,
    };
    console.log('this is payout body', body);
    this.api.addPayout(body).subscribe( data => {
      console.log('This Payout is updated successfully', data);
      this.toaster.success('Payout added Successfully', 'Added');
      this.router.navigateByUrl('/payouts');
    }, error => {
      this.util.openSnackBar(error.error.message, 'Ok');
      console.log('An error occurred while updating', error);
    });
  }
}
