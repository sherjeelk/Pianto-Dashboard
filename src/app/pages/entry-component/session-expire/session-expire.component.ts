import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UtilsService} from '../../../services/utils.service';
import {SessionService} from '../../../services/session.service';
import * as moment from 'moment';

@Component({
  selector: 'app-session-expire',
  templateUrl: './session-expire.component.html',
  styleUrls: ['./session-expire.component.scss']
})

@ViewChild('modal-notification')
// public wizardRef:new TemplateRef<any>();

export class SessionExpireComponent implements OnInit {

  constructor(private modalService: NgbModal, private util: UtilsService, private session : SessionService) { }

  ngOnInit(): void {
    this.checkSession();
    // this.modalService.open();
  }
  checkSession() {
    if (moment().isSameOrBefore(this.session.sessionExpiry)) {
      console.log('no problem in session');
    } else {
      this.alert();
    }
  }

  alert() {
    if (window.confirm('Your Session has expired please logout'))
    {
      this.util.logout();
    }
    else
    {
      this.util.logout();
    }}

}
