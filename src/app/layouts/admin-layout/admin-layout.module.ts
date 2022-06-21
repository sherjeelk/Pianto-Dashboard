import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SessionExpireComponent} from '../../pages/entry-component/session-expire/session-expire.component';
import {OrdersComponent} from '../../pages/Order/orders/orders.component';
import {UserDetailsComponent} from '../../pages/User/user-details/user-details.component';
import {ServicesComponent} from '../../pages/Service/services/services.component';
import {ServiceDetailsComponent} from '../../pages/Service/service-details/service-details.component';
import {SettingsComponent} from '../../pages/Setting/settings/settings.component';
import {SettingsDetailsComponent} from '../../pages/Setting/settings-details/settings-details.component';
import {UsersComponent} from '../../pages/User/users/users.component';
import {AddOrderComponent} from '../../pages/Order/add-order/add-order.component';
import {AddServicesComponent} from '../../pages/Service/add-services/add-services.component';
import {AddSettingsComponent} from '../../pages/Setting/add-settings/add-settings.component';
import {AddUserComponent} from '../../pages/User/add-user/add-user.component';
import {OrderDetailsComponent} from '../../pages/Order/order-details/order-details.component';
import {LoaderComponent} from '../../pages/entry-component/loader/loader.component';
import {PricingComponent} from '../../pages/pricing/pricing/pricing.component';
import {PricingDetailsComponent} from '../../pages/pricing/pricing-details/pricing-details.component';
import {AddPricingComponent} from '../../pages/pricing/add-pricing/add-pricing.component';
import {ChargesComponent} from '../../pages/Charges/charges/charges.component';
import {AddChargesComponent} from '../../pages/Charges/add-charges/add-charges.component';
import {ChargeDetailsComponent} from '../../pages/Charges/charge-details/charge-details.component';
import {CouponsComponent} from '../../pages/Coupons/coupons/coupons.component';
import {CouponDetailsComponent} from '../../pages/Coupons/coupon-details/coupon-details.component';
import {AddCouponsComponent} from '../../pages/Coupons/add-coupons/add-coupons.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {RatingModule} from 'ng-starrating';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatOptionModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    RatingModule,
    ClickOutsideModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    MapsComponent,
    SessionExpireComponent,
    OrdersComponent,
    UserDetailsComponent,
    CouponsComponent,
    ServicesComponent,
    CouponDetailsComponent,
    ServiceDetailsComponent,
    SettingsComponent,
    SettingsDetailsComponent,
    UsersComponent,
    AddOrderComponent,
    AddCouponsComponent,
    AddServicesComponent,
    AddSettingsComponent,
    AddUserComponent,
    OrderDetailsComponent,
    LoaderComponent,
    PricingComponent,
    PricingDetailsComponent,
    AddPricingComponent,
    ChargesComponent,
    AddChargesComponent,
    ChargeDetailsComponent,
  ], exports: [
    SessionExpireComponent,
    LoaderComponent
  ],
  providers: [MatSnackBar]
})

export class AdminLayoutModule {}
