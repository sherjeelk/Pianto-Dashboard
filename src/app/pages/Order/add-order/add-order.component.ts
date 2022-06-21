import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Service} from '../../../models/Services';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit, OnDestroy {
  serviceData: Service;
  serviceId;
  addOrderForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    pianoName: ['', [Validators.required]],
    type: ['', [Validators.required]],
    serial: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    time: ['', [Validators.required]],
    lastService: ['', [Validators.required]],
    date: [''],
    total: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postcode: ['', [Validators.required]],
    email: ['', [Validators.required]],
    paymentMethod: [''],
    discount: [''],
    coupon: [''],
    subtotal: [''],
    // serviceMan: [''],
    charges: [''],
    status: ['', [Validators.required]],
    // user: [''],
    service: ['']
  });

  selectedServiceMan = {
    id : ''
  };
  selectedUser = {
    id : ''
  };

  // for multi select charges
  public charges: any[];
  public chargeMultiCtrl: FormControl = new FormControl();
  public chargeMultiFilterCtrl: FormControl = new FormControl();
  public filteredChargesMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('chargeMultiSelect', { static: true }) chargeMultiSelect: MatSelect;

  // for multi select service
  public services: any[];
  public serviceMultiCtrl: FormControl = new FormControl();
  public serviceMultiFilterCtrl: FormControl = new FormControl();
  public filteredServicesMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('serviceMultiSelect', { static: true }) serviceMultiSelect: MatSelect;
  protected onDestroy = new Subject<void>();

  // for select user

  protected users: any[];

  /** control for the selected bank */
  public userCtrl: FormControl = new FormControl();
  public serviceManCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public userFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredUsers: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  service = [];
  questions = [];
  public previousSlots: any[];
  previous = false;
  public answers = [];
  public allServiceMan: any[] = [];
  public allUser: any[] = [];

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) { }

  // charges: {charge : '500'},
  // service: {name : 'service'},
  slotDate;

  ngOnInit(): void {
    this.getCharges();
    this.getServices();
    this.getUsers();
    this.getQuestions();
  }
  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  protected filterChargesMulti() {
    if (!this.charges) {
      return;
    }
    // get the search keyword
    let search = this.chargeMultiFilterCtrl.value;
    if (!search) {
      this.filteredChargesMulti.next(this.charges.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredChargesMulti.next(
      this.charges.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterServicesMulti() {
    if (!this.services) {
      return;
    }
    // get the search keyword
    let search = this.serviceMultiFilterCtrl.value;
    if (!search) {
      this.filteredServicesMulti.next(this.services.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredServicesMulti.next(
      this.service.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }


 // add new Order using this functon
  addOrder() {
    console.log('this add order value**********', this.addOrderForm.value);
    console.log('**********', this.serviceMultiCtrl?.value);
    const body = this.addOrderForm.value;
    body.charges =  this.chargeMultiCtrl?.value;
    body.service = this.serviceMultiCtrl?.value;
    body.user = this.selectedUser.id;
    body.serviceMan = this.selectedServiceMan.id;
    body.city =  body.city.toLowerCase();
    body.date = moment(this.slotDate).toDate();
    body.questions =  this.answers;


    console.log(this.chargeMultiCtrl);
    if (this.addOrderForm.valid ) {
      if (this.serviceMultiCtrl?.value !== null) {
        if (this.selectedServiceMan.id.trim() !== '') {
          if (this.selectedUser.id.trim() !== '') {
            console.log('this is body of order', body);
            this.api.addOrder(body).subscribe( data => {
              this.sendEmail(data.serviceMan);
              console.log('This order is added successfully', data);
              this.toaster.success('Order added Successfully', 'Added');
              this.router.navigateByUrl('/orders');
            }, error => {
              console.log('An error occurred while updating', error.message);
              this.util.openSnackBar(error.error.message, 'Ok');
            });
          } else {
            this.util.openSnackBar('Please select user', 'Ok');
          }
        } else {
          this.util.openSnackBar('Please select service man', 'Ok');

        }

      } else {
        this.util.openSnackBar('Please select services', 'Ok');

      }

    } else {
      console.log('find invalid control', this.findInvalidControls());
      this.util.openSnackBar('Please correct form errors first', '');
    }
  }

  addOrderwithUserUpdate() {
    // this.getUserSlots(this.serviceManCtrl?.value.id);
    this.addOrder();

  }

  getUserSlots(id) {
    console.log('this is service man id', this.serviceManCtrl?.value.id);
    const  currentSlot = {
      date: moment(this.slotDate).toDate().toString(),
      from: this.addOrderForm.value.time,
      till: this.addOrderForm.value.time,
      available: true

    };
    this.api.getUser(id).subscribe(data => {
      console.log('data of user*********', data);
      if (data.slots) {
        if (data.slots.length > 0) {
          this.previousSlots =  data.slots;
          console.log('this is previous slot', this.previousSlots);
          console.log('previous slot exist push this one', currentSlot);
          this.previousSlots.push(currentSlot);
          this.api.updateUser(id, {slots: this.previousSlots}).subscribe( resp => {
            console.log('new slot pushed into existing slot of user', resp);
            console.log('previous slot',  this.previousSlots);
            console.log('current slot pushed into existing slot of user',  currentSlot);
            console.log('new slot pushed into existing slot of user****', this.previousSlots);
            },  error => {
            console.log('errror occurred new pushed into existing slot of user', error);

          });
          this.previous = true;
        }else {
          console.log('previous not slot exist');
          this.api.updateUser(id, {slots: currentSlot}).subscribe( resp => {
            console.log('new slot pushed into existing slot of user', resp);
          },  error => {
            console.log('errror occurred new pushed into existing slot of user', error);

          });
          this.previous = false;
        }
      }else {
        console.log('previous not slot exist');
        this.api.updateUser(id, {slots: currentSlot}).subscribe( resp => {
          console.log('new slot pushed into existing slot of user', resp);
        },  error => {
          console.log('errror occurred new pushed into existing slot of user', error);

        });
        this.previous = false;
      }
    });
  }

  getCharges() {
    this.api.getAllCharges().subscribe( data => {
      this.charges = data.results;
      this.filteredChargesMulti.next(this.charges.slice());
      this.chargeMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterChargesMulti();
        });
    }, error => {
      console.log('error occurred i getting charges', error);
    });
  }

  getServices() {
    this.api.getAllServices().subscribe( data => {
      this.services = data.results;
      this.filteredServicesMulti.next(this.services.slice());
      this.serviceMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterServicesMulti();
        });
    }, error => {
      console.log('error occurred i getting charges', error);
    });
  }

  getUsers() {
    this.api.getAllUsers().subscribe( data => {
      this.users = data.results;
      // load the initial bank list
      this.filteredUsers.next(this.users.slice());

      // listen for search field value changes
      this.userFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterUsers();
        });
      console.log('these are all charges', this.services);
    }, error => {
      console.log('error occurred i getting charges', error);
    });
  }

  protected filterUsers() {
    if (!this.users) {
      return;
    }
    // get the search keyword
    let search = this.userFilterCtrl.value;
    if (!search) {
      this.filteredUsers.next(this.users.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredUsers.next(
      this.users.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  // Function to get service man details after placing order to get email

  sendEmail(id) {
    this.api.getUser(id).subscribe(data => {
      const email = data.email;
      const body = {
        subject: 'New Order',
        email,
        text: 'A new Order with order id ' + id + 'has be assigned to you. Please check your rider app for more details'
      };
      this.api.sendEmail(body).subscribe(  resp => {
        console.log('Email sent Successfully', resp);
      }, error => {
        console.log('error occurred while sending email', error);
      });
    }, error => {

    });

    const notificationBody = {
      title: 'New Order',
      text: 'A new order has been assigned to you please open app for further details',
      user: id
    };

    this.api.sendNotification(notificationBody).subscribe(resp => {
      console.log('notification sent Successfully', resp);
    }, error => {
      console.log('error occurred while sending email', error);
    });
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.addOrderForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  getQuestions() {
    this.api.getQuestionsFromExtras().subscribe( data => {
      this.questions = data.results;
      for (const item of this.questions){
        this.answers.push({
          question: item.name,
          answer: ''
        });
      }
      console.log('these are all questions', this.questions);
    }, error => {
      console.log('an error occurred while getting questions', error);
    });
  }

  addServiceMan(result: any) {
    console.log('this is the result', result);
    this.selectedServiceMan.id = result.id;
    this.allServiceMan = [];
  }

  addUser(result: any) {
    console.log('this is the result', result);
    this.selectedUser.id = result.id;
    this.allUser = [];
  }

  onClickedOutside($event: Event) {
    this.allServiceMan = [];
  }

  onClickedOutsideUser($event: Event) {
    this.allUser = [];
  }

  getUser(role, query) {
    const body = [{role}, {name : query }];
    this.api.getAllSearchInUsers(body).subscribe(data => {
      this.allUser = data;
    }, error => {
      console.log('An error occurred while getting all piano names', error);
    });
  }

  getServiceMan(role, query) {
    const body = [{role}, {name : query }];
    this.api.getAllSearchInUsers(body).subscribe(data => {
      this.allServiceMan = data;
    }, error => {
      console.log('An error occurred while getting all piano names', error);
    });
  }
}
