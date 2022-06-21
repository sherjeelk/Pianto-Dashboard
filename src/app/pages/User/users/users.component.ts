import { Component, OnInit } from '@angular/core';
import {AllUser, User} from '../../../models/UserDetail';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {SessionService} from '../../../services/session.service';
import * as moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public allUsers: AllUser;
  public userId;
  public totalPage: number[];
  public page: any;
  asc = false;
  i;
  progress = false;
  allUsersResults: User[];
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Role'];

  constructor(private api: ApiService, private toaster: ToastrService, private router: Router, private session: SessionService) { }

  ngOnInit() {
    // this.getAllUsers();
    this.getPageData('1');
    this.session.getExpiryTime();
    console.log('check session is expired or not', moment().isSameOrBefore(this.session.sessionExpiry) );
  }

  getAllUsers() {
    this.progress = true;
    this.api.getAllUsers().subscribe(data => {
      console.log('this is all users', data);
      this.allUsers = data;
      this.getTotalPages();
      this.progress = false;

      // this.filterData( 'email' , 'jai');
      console.log('these are all users********', this.allUsers.results);
    },  error => {
      this.progress = false;
      console.log('An Error Occurred', error);

    });
  }

  deleteUser(id) {
    this.progress = true;

    console.log('this is deletion id', id);
    this.api.deleteUser(id).subscribe(data => {
      this.toaster.success('User Deleted Successfully', 'Deleted');
      this.progress = false;
      this.router.navigateByUrl('users');
    }, error => {
      this.progress = false;
    });
  }
  getTotalPages() {
    this.totalPage = Array(this.allUsers.totalPages).fill(0).map((x, i) => i);
    console.log('**************', this.totalPage);

  }

  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getUsersByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allUsers = data;
      this.allUsersResults = data.results;
    });
  }

  sortData(data) {
    this.asc = !this.asc;
    if (this.asc) {
      this.i = 'asc';
    } else {
      this.i = 'desc';
    }
    this.allUsers.results = _.orderBy(this.allUsers.results, [user => user[data]], [this.i]);
  }
  filterData(data , query){
    this.allUsers.results = _.filter(this.allUsers.results, person => person[data] === query);
  }
}


