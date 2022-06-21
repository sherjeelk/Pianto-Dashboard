import { Component, OnInit } from '@angular/core';
import {Service} from '../../../models/Services';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss']
})
export class AddServicesComponent implements OnInit {
  serviceDetailsForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    name_fi: ['', [Validators.required]],
    type: ['', [Validators.required]],
    price: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    desc_fi: ['', [Validators.required]],
  });

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  postService() {
    const body = {
      name : this.serviceDetailsForm.value.name,
      name_fi : this.serviceDetailsForm.value.name,
      price : this.serviceDetailsForm.value.price,
      type : this.serviceDetailsForm.value.type,
      desc : this.serviceDetailsForm.value.desc,
      desc_fi : this.serviceDetailsForm.value.desc_fi
    };
    this.api.addService(body).subscribe( data => {
      console.log('This Service is updated successfully', data);
      this.toaster.success('Service added Successfully', 'Added');
      this.router.navigateByUrl('/services');
    }, error => {
      this.util.openSnackBar(error.error.message, 'Ok');
      console.log('An error occurred while updating', error);
    });

  }

}
