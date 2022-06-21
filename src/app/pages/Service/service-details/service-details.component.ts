  import { Component, OnInit } from '@angular/core';
  import {FormBuilder, Validators} from '@angular/forms';
  import {UtilsService} from '../../../services/utils.service';
  import {ActivatedRoute, Router} from '@angular/router';
  import {ApiService} from '../../../services/api.service';
  import {ToastrService} from 'ngx-toastr';
  import {Service} from '../../../models/Services';

  @Component({
    selector: 'app-service-details',
    templateUrl: './service-details.component.html',
    styleUrls: ['./service-details.component.scss']
  })
  export class ServiceDetailsComponent implements OnInit {
    serviceData: Service;
    serviceId;
    enable;
    serviceDetailsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      name_fi: ['', [Validators.required]],
      type: ['', [Validators.required]],
      price: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      desc_fi: ['', [Validators.required]],
      enable: ['', [Validators.required]],
    });
    public progress = false;

    constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
                private router: Router, private toaster: ToastrService) { }

    ngOnInit(): void {
      this.serviceId = this.route.snapshot.paramMap.get('id');
      console.log('this is Service id', this.serviceId);
      this.getServiceDetails();
    }

    getServiceDetails() {
      this.progress = true;
      if (this.serviceId) {
        this.api.getService(this.serviceId).subscribe(data => {
          this.serviceData = data;
          console.log('this is Service data', this.serviceData);
          this.serviceDetailsForm.patchValue({
            name: this.serviceData.name,
            name_fi: this.serviceData.name_fi,
            price: this.serviceData.price,
            type: this.serviceData.type,
            desc: this.serviceData.desc,
            desc_fi: this.serviceData.desc_fi,
            enable: this.serviceData.enable,
          });
          this.progress = false;
        });
      } else {
        console.log('this is Service id', this.serviceId);
        this.progress = false;
      }

    }
    updateService() {
      this.progress = true;
      const body = {
        name : this.serviceDetailsForm.value.name,
        name_fi : this.serviceDetailsForm.value.name_fi,
        price : this.serviceDetailsForm.value.price,
        type : this.serviceDetailsForm.value.type,
        desc : this.serviceDetailsForm.value.desc,
        desc_fi : this.serviceDetailsForm.value.desc_fi,
        enable : this.enable

      };
      this.api.updateService(this.serviceId, body).subscribe(data => {
          console.log('This Service is updated successfully', data);
          this.toaster.success('Service Updated Successfully', 'Updated');
          this.progress = false;
          this.router.navigateByUrl('/services');
        }, error => {
        this.progress = false;
        this.util.openSnackBar(error.error.message, 'Ok');
        console.log('An error occured while updating', error);
        }
      );
    }
    deleteService(id) {
      console.log('this is deletion id', id);
      this.api.deleteService(id).subscribe(data => {
        this.toaster.success('Service Deleted Successfully', 'Deleted');
        this.router.navigateByUrl('/services');
      }, error => {

      });
    }
  }
