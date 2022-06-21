import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtilsService} from '../../services/utils.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: ''},
  {path: '/users', title: 'Users', icon: 'ni-bullet-list-67 text-red', class: ''},
  {path: '/services', title: 'Services', icon: 'ni-satisfied text-pink', class: ''},
  {path: '/coupons', title: 'Coupons', icon: 'ni-paper-diploma text-orange', class: ''},
  {path: '/orders', title: 'Orders', icon: 'ni-planet text-blue', class: ''},
  {path: '/pricing', title: 'Pricing', icon: 'ni-money-coins text-red', class: ''},
  {path: '/charges', title: 'Charges', icon: 'ni-tag text-green', class: ''},
  {path: '/extras', title: 'Extras', icon: 'ni-folder-17 text-pink', class: ''},
  {path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: ''},
  {path: '/settings', title: 'Settings', icon: 'ni-settings text-info', class: ''},
  {path: '/reviews', title: 'Reviews', icon: 'ni-like-2 text-pink', class: ''},
  {path: '/payouts', title: 'Payout', icon: 'ni-credit-card text-blue', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, public util: UtilsService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
