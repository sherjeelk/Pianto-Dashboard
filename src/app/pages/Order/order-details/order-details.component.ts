import {Component, OnInit, ViewChild} from '@angular/core';
import {Order, Orders} from '../../../models/Orders';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {Extra} from '../../../models/Extras';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderData: Order;
  orderId;
  service = [];

  selectedServiceMan = {
    id : ''
  };
  selectedUser = {
    id : ''
  };
  addOrderForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    pianoName: ['', [Validators.required]],
    type: ['', [Validators.required]],
    serial: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    time: [''],
    lastService: ['', [Validators.required]],
    date: [''],
    total: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postcode: ['', [Validators.required]],
    email: ['', [Validators.required]],
    paymentMethod: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    coupon: ['', [Validators.required]],
    subtotal: ['', [Validators.required]],
    serviceMan: [''],
    contactCustomer: [''],
    charges: [''],
    cancellationNote: [''],
    status: ['', [Validators.required]],
    user: [''],
    service: [''],
    notes: [''],
    extended: [''],
    placedDate: ['']
  });

  // for multi select charges
  public charges: any[];
  public chargeMultiCtrl: FormControl = new FormControl();
  public chargeMultiFilterCtrl: FormControl = new FormControl();
  public filteredChargesMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('chargeMultiSelect', {static: true}) chargeMultiSelect: MatSelect;

  // for multi select service
  public services: any[];
  public serviceMultiCtrl: FormControl = new FormControl();
  public serviceMultiFilterCtrl: FormControl = new FormControl();
  public filteredServicesMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('serviceMultiSelect', {static: true}) serviceMultiSelect: MatSelect;
  /** control for the selected bank */
  public userCtrl: FormControl = new FormControl();

  // for select user
  public serviceManCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword */
  public userFilterCtrl: FormControl = new FormControl();
  /** list of banks filtered by search keyword */
  public filteredUsers: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;
  public selectedUserId: string;
  public serviceManId: string;
  public previousSlots: any[];
  // service: {name : 'service'},
  slotDate: any;
  protected onDestroy = new Subject<void>();
  protected users: any[];
  private previous = false;
  private update = false;
  answers = [];

  // charges: {charge : '500'},
  public questions: Extra[] = [];
  public allServiceMan: any[] = [];
  public allUser: any[] = [];

  constructor(public util: UtilsService, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder,
              private router: Router, private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');

    this.getOrderDetails();
    this.getCharges();
    this.getServices();
    this.getUsers();
  }

  getOrderDetails() {
    if (this.orderId) {
      this.api.getOrder(this.orderId).subscribe(data => {
        this.orderData = data;
        this.answers = data.questions;
        if (this.answers.length > 0) {
          console.log('do nothing');
        } else {
          this.getQuestions();
        }
        console.log('This is order date', this.orderData.date);
        this.slotDate = this.orderData.date ?  moment(this.orderData.date).toDate() : undefined;

        console.log('this is order data', this.orderData);
        this.addOrderForm.patchValue({
          name: this.orderData.name,
          pianoName: this.orderData.pianoName,
          time: this.orderData.time,
          phone: this.orderData.phone,
          status: this.orderData.status,
          lastService: this.orderData.lastService,
          serial: this.orderData.serial,
          type: this.orderData.type,
          service: this.orderData.service,
          total: this.orderData.total,
          address: this.orderData.address,
          city: this.orderData.city,
          postcode: this.orderData.postcode,
          email: this.orderData.email,
          paymentMethod: this.orderData.paymentMethod,
          discount: this.orderData.discount,
          coupon: this.orderData.coupon,
          subtotal: this.orderData.subtotal,
          serviceMan: this.orderData.serviceMan,
          charges: this.orderData.charges,
          cancellationNote: this.orderData.cancellationNote,
          user: this.orderData.user,
          extended: this.orderData.extended,
          contactCustomer: this.orderData.contactCustomer,
          notes: this.orderData.notes,
          placedDate: moment(this.orderData.created).add(3, 'hour').toDate()
        });

        console.log('this is order data**************', this.orderData);
        this.chargeMultiCtrl.setValue(this.orderData.charges);
        this.serviceMultiCtrl.setValue(this.orderData.service);
        // this.serviceManCtrl.setValue(this.orderData.serviceMan);
        // this.userCtrl.setValue(this.orderData.user);
        this.selectedUserId = this.orderData.user;
        this.serviceManId = this.orderData.serviceMan;
      });
    }

  }

  // Call update order and get user slots from this function
  updateThisOrder() {
    // this.getUserSlots(this.serviceManId ? this.serviceManId : this.orderData.serviceMan);
    setTimeout(() => {
      this.updateOrder();

    }, 1500);

  }

  // update order
  updateOrder() {
    const body = this.addOrderForm.value;
    // console.log('this is order data service man ', this.orderData.serviceMan);
    // console.log('this is order data form service man ', this.serviceManCtrl?.value.id);
    // console.log('both are equal?', this.orderData.serviceMan !== this.serviceManCtrl?.value.id);
    body.charges = this.chargeMultiCtrl?.value;
    body.service = this.serviceMultiCtrl?.value;
    body.user = this.selectedUserId;
    // body.serviceMan = this.serviceManCtrl?.value.id === undefined ? this.orderData.serviceMan : this.serviceManCtrl?.value.id;
    body.date = moment(this.slotDate).toDate();
    body.city = body.city.toLowerCase();
    body.questions = this.answers;
    // const slots = {
    //   date: moment(this.slotDate).toDate().toString(),
    //   from: this.addOrderForm.value.time,
    //   till: this.addOrderForm.value.time,
    //   available: true
    // };
    this.api.updateOrder(this.orderId, body).subscribe(data => {
        console.log('This Service is updated successfully', data);
        this.toaster.success('Order Updated Successfully', 'Updated');
        if (body.serviceMan !== this.orderData.serviceMan) {
          console.log('**********************', body);
          console.log('Send email service man is changed');
          this.sendEmailNewService(body.serviceMan);
          this.sendEmailPreviousService(this.orderData.serviceMan);
        } else if (body.status !== this.orderData.status && (body.status === 'CANCELLED' || body.status === 'REJECTED')) {
          console.log('Send email status is changed');

          this.sendCancelEmailToService(this.orderData.serviceMan);
        }else if (body.status !== this.orderData.status && (body.status === 'PAYMENT_CONFIRMED')) {
          console.log('Send email status is changed');

          this.sendPaymentConfirmedEmailToService(this.orderData.serviceMan);
        } else if (body.time !== this.orderData.time || body.address !== this.orderData.address || body.city !== this.orderData.city) {
          console.log('time is changed');

          this.timeChangeToService(this.orderData.serviceMan);
        }
        this.update = true;
        this.router.navigateByUrl('/orders');

      }, error => {
        this.util.openSnackBar(error.error.message, 'Ok');
        console.log('An error occured while updating', error);
      }
    );
  }

  // Get User Slots based on user id from order
  // getUserSlots(id) {
  //   const currentSlot = {
  //     date: moment(this.slotDate).toDate().toString(),
  //     from: this.addOrderForm.value.time,
  //     till: this.addOrderForm.value.time,
  //     available: true
  //   };
  //   this.api.getUser(id).subscribe(data => {
  //     console.log('data of user*********', data);
  //     if (data.slots) {
  //       if (data.slots.length > 0) {
  //         this.previousSlots = data.slots;
  //         console.log('this is previous slot', data.slots);
  //         console.log('previous slot exist');
  //         this.previousSlots.push(currentSlot);
  //         this.api.updateUser(id, {slots: this.previousSlots}).subscribe(resp => {
  //           console.log('this is slot after pushing', this.previousSlots.push(currentSlot));
  //           console.log('new slot pushed into existing slot of user', resp);
  //           console.log('current slot pushed into existing slot of user', currentSlot);
  //           console.log('new slot pushed into existing slot of user****', this.previousSlots);
  //         }, error => {
  //           console.log('errror occurred new pushed into existing slot of user', error);
  //
  //         });
  //         this.previous = true;
  //       } else {
  //         console.log('previous not slot exist');
  //         this.api.updateUser(id, {slots: currentSlot}).subscribe(resp => {
  //           console.log('new slot pushed into existing slot of user', resp);
  //         }, error => {
  //           console.log('errror occurred new pushed into existing slot of user', error);
  //
  //         });
  //         this.previous = false;
  //       }
  //     } else {
  //       console.log('previous not slot exist');
  //       this.api.updateUser(id, {slots: [currentSlot]}).subscribe(resp => {
  //         console.log('new slot pushed into existing slot of user', resp);
  //       }, error => {
  //         console.log('errror occurred new pushed into existing slot of user', error);
  //
  //       });
  //       this.previous = false;
  //     }
  //   });
  // }

  // Delete order using Order Id
  deleteOrder(id) {
    console.log('this is deletion id', id);
    this.api.deleteOrder(id).subscribe(data => {
      console.log('this is order is deleted successfully', data);
      this.toaster.success('Order Deleted Successfully', 'Deleted');
      this.router.navigateByUrl('/orders');
    }, error => {

    });
  }

  // Get charges for multiselect charges
  getCharges() {
    this.api.getAllCharges().subscribe(data => {
      this.charges = data.results;
      this.filteredChargesMulti.next(this.charges.slice());
      this.chargeMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterChargesMulti();
        });
      console.log('these are all charges', this.charges);
    }, error => {
      console.log('error occurred i getting charges', error);
    });
  }

  // Get services for multiselect services
  getServices() {
    this.api.getAllServices().subscribe(data => {
      this.services = data.results;
      this.filteredServicesMulti.next(this.services.slice());
      this.serviceMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterServicesMulti();
        });
      console.log('these are all charges', this.services);
    }, error => {
      console.log('error occurred i getting charges', error);
    });
  }

  // Get users for multi selection
  getUsers() {
    this.api.getAllUsers().subscribe(data => {
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

  // Send email to new service man if service man is changed
  sendEmailNewService(id) {
    this.api.getUser(id).subscribe(data => {
      const email = data.email;
      const body = {
        subject: 'New Order',
        email,
        text: 'A new Order with order id ' + this.orderData._id + 'has be assigned to you. Please check your rider app for more details'
      };
      console.log('this is the body of email', body);
      this.api.sendEmail(body).subscribe(resp => {
        console.log('Email sent Successfully', resp);
      }, error => {
        console.log('error occurred while sending email', error);

      });
    }, error => {

    });

    const notificationBody = {
      title: 'Service assigned',
      text:  'Order with order id ' + this.orderData._id + ' is now assigned to You',
      user: id
    };
    this.api.sendNotification(notificationBody).subscribe(data => {
      console.log('notification sent Successfully', data);
    }, error => {
      console.log('error occurred while sending email', error);
    });
  }

  // Send email to Old service man if service man is changed
  sendEmailPreviousService(id) {
    this.api.getUser(id).subscribe(data => {
      const email = data.email;
      const body = {
        subject: 'Service removed',
        email,
        text: 'Order with order id ' + this.orderData._id + ' is now assigned to another service man'
      };
      console.log('this is the body of email', body);
      this.api.sendEmail(body).subscribe(resp => {
        console.log('Email sent Successfully', resp);
      }, error => {
        console.log('error occurred while sending email', error);

      });
    }, error => {

    });

    const notificationBody = {
      title: 'Service removed',
      text:  'Order with order id ' + this.orderData._id + ' is now assigned to another service man',
      user: id
    };
    this.api.sendNotification(notificationBody).subscribe(data => {
      console.log('notification sent Successfully', data);
    }, error => {
      console.log('error occurred while sending email', error);
    });
  }



  // Send email to service man if status cancelled
  sendCancelEmailToService(id) {
    this.api.getUser(id).subscribe(data => {
      const email = data.email;
      const body = {
        subject: 'New Order',
        email,
        text: 'Order with order id ' + this.orderData._id + 'has been cancelled'
      };
      console.log('this is the body of email', body);
      this.api.sendEmail(body).subscribe(resp => {
        console.log('Email sent Successfully', resp);
      }, error => {
        console.log('error occurred while sending email', error);

      });
    }, error => {
    });

    const notificationBody = {
      title: 'Order Cancelled',
      text: 'Order ' + this.orderData._id + ' has been cancelled.',
      user: id
    };

    this.api.sendNotification(notificationBody).subscribe(data => {
      console.log('notification sent Successfully', data);
    }, error => {
      console.log('error occurred while sending email', error);
    });
  }


  // Send email to service man if status completed
  sendPaymentConfirmedEmailToService(id) {
    this.api.getUser(id).subscribe(data => {
      const email = data.email;
      const body = {
        subject: 'New Order',
        email,
        text: `Hi, a new order has been received with order id ${this.orderData._id}, please check the application for more details.`
      };
      console.log('this is the body of email', body);
      this.api.sendEmail(body).subscribe(resp => {
        console.log('Email sent Successfully', resp);
      }, error => {
        console.log('error occurred while sending email', error);

      });
    }, error => {
    });

    const notificationBody = {
      title: 'New Order',
      text: `Hi, a new order has been received with order id ${this.orderData._id}, please check the application for more details.`,
      user: id
    };

    this.api.sendNotification(notificationBody).subscribe(data => {
      console.log('notification sent Successfully', data);
    }, error => {
      console.log('error occurred while sending email', error);
    });
  }



  // Send email to service man if status timing is changed
  timeChangeToService(id) {
    this.api.getUser(id).subscribe(data => {
      const email = data.email;
      const body = {
        subject: 'New Order',
        email,
        text: 'Order with order id ' + this.orderData._id + 'Location or time has been checked please check your app for further details'
      };
      const notificationBody = {
        title: 'Timing changed',
        text: 'Timing of order with id ' + this.orderData._id + ' has been cancelled.',
        user: id
      };

      console.log('this is the body of email', body);
      this.api.sendNotification(notificationBody).subscribe(resp => {
        console.log('notification sent Successfully', data);
        }, error => {
        console.log('error occurred while sending email', error);
      });
      this.api.sendEmail(body).subscribe(resp => {
        console.log('Email sent Successfully', resp);
      }, error => {
        console.log('error occurred while sending email', error);

      });
    }, error => {

    });
  }

  // Filter users for multi selection
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

  // Filter charges for multiselect charges
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

  // Get services for multi select options
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

  onClickedOutside($event: Event) {
    this.allServiceMan = [];
  }
  onClickedOutsideUser($event: Event) {
    this.allUser = [];
  }

  getServiceMan(role, query) {
    const body = [{role}, {name : query }];
    this.api.getAllSearchInUsers(body).subscribe(data => {
      this.allServiceMan = data;
    }, error => {
      console.log('An error occurred while getting all piano names', error);
    });
  }

  getUser(role, query) {
    const body = [{role}, {name : query }];
    this.api.getAllSearchInUsers(body).subscribe(data => {
      this.allUser = data;
    }, error => {
      console.log('An error occurred while getting all piano names', error);
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


}


