import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-charges',
  templateUrl: './add-charges.component.html',
  styleUrls: ['./add-charges.component.scss']
})
export class AddChargesComponent implements OnInit {
  chargeDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    name_fi: ['', [Validators.required]],
    type: ['', [Validators.required]],
    value: ['', [Validators.required]],
    description: ['', [Validators.required]],
    enable: ['', [Validators.required]],
    amountType: ['', [Validators.required]],
  });
  enable = false;

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  postCharges() {
    const body = {
      name : this.chargeDetailsForm.value.name,
      name_fi : this.chargeDetailsForm.value.name_fi,
      value : this.chargeDetailsForm.value.value,
      type : this.chargeDetailsForm.value.type,
      description : this.chargeDetailsForm.value.description,
      amountType : this.chargeDetailsForm.value.amountType,
      enable : this.enable,
    };
    if (this.chargeDetailsForm.valid) {
      this.api.addCharges(body).subscribe( data => {
        console.log('This charge is updated successfully', data);
        this.toaster.success('Charge added Successfully', 'Added');
        this.router.navigateByUrl('/charges');
      }, error => {
        console.log('An error occurred while updating', error);
        this.util.openSnackBar(error.error.message, 'Ok');
      });
    } else {
      this.util.openSnackBar('Please correct form errors first', 'Ok');
    }

  }
}
