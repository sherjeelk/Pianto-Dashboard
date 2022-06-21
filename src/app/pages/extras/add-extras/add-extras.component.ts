import { Component, OnInit } from '@angular/core';
import {Extra} from '../../../models/Extras';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-extras',
  templateUrl: './add-extras.component.html',
  styleUrls: ['./add-extras.component.scss']
})
export class AddExtrasComponent implements OnInit {
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
  }

  postExtra() {
    this.progress = true;
    const body = {
      name : this.extraDetailsForm.value.name,
      name_fi : this.extraDetailsForm.value.name_fi,
      value : this.extraDetailsForm.value.value,
      type : this.extraDetailsForm.value.type,
      valueNum: this.extraDetailsForm.value.valueNum,
      enable: this.enable

    };
    this.api.addExtra(body).subscribe(data => {
        console.log('This Extra is added successfully', data);
        this.toaster.success('Extra Added Successfully', 'Added');
        this.progress = false;
        this.router.navigateByUrl('extras');
      }, error => {
        this.progress = false;
        this.util.openSnackBar(error.error.message, 'Ok');
        console.log('An error occurred while adding', error);
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
