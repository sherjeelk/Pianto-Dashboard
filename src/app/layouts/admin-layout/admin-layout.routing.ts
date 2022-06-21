import {Routes} from '@angular/router';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {OrdersComponent} from '../../pages/Order/orders/orders.component';
import {UserDetailsComponent} from '../../pages/User/user-details/user-details.component';
import {CouponDetailsComponent} from '../../pages/Coupons/coupon-details/coupon-details.component';
import {ServicesComponent} from '../../pages/Service/services/services.component';
import {ServiceDetailsComponent} from '../../pages/Service/service-details/service-details.component';
import {SettingsComponent} from '../../pages/Setting/settings/settings.component';
import {SettingsDetailsComponent} from '../../pages/Setting/settings-details/settings-details.component';
import {AuthGuard} from '../../pages/login/auth.guard';
import {UsersComponent} from '../../pages/User/users/users.component';
import {AddOrderComponent} from '../../pages/Order/add-order/add-order.component';
import {OrderDetailsComponent} from '../../pages/Order/order-details/order-details.component';
import {AddUserComponent} from '../../pages/User/add-user/add-user.component';
import {AddSettingsComponent} from '../../pages/Setting/add-settings/add-settings.component';
import {AddCouponsComponent} from '../../pages/Coupons/add-coupons/add-coupons.component';
import {AddServicesComponent} from '../../pages/Service/add-services/add-services.component';
import {AddPricingComponent} from '../../pages/pricing/add-pricing/add-pricing.component';
import {PricingComponent} from '../../pages/pricing/pricing/pricing.component';
import {PricingDetailsComponent} from '../../pages/pricing/pricing-details/pricing-details.component';
import {AddChargesComponent} from '../../pages/Charges/add-charges/add-charges.component';
import {ChargeDetailsComponent} from '../../pages/Charges/charge-details/charge-details.component';
import {ChargesComponent} from '../../pages/Charges/charges/charges.component';
import {CouponsComponent} from '../../pages/Coupons/coupons/coupons.component';
import {AddExtrasComponent} from '../../pages/extras/add-extras/add-extras.component';
import {ExtrasComponent} from '../../pages/extras/extras/extras.component';
import {ExtraDetailsComponent} from '../../pages/extras/extra-details/extra-details.component';
import {AddReviewComponent} from '../../pages/reviews/add-review/add-review.component';
import {ReviewsComponent} from '../../pages/reviews/reviews/reviews.component';
import {ReviewDetailsComponent} from '../../pages/reviews/review-details/review-details.component';
import {AddPayoutComponent} from '../../pages/payout/add-payout/add-payout.component';
import {PayoutsComponent} from '../../pages/payout/payouts/payouts.component';
import {PayoutDetailsComponent} from '../../pages/payout/payout-details/payout-details.component';

export const AdminLayoutRoutes: Routes = [
  {canActivate: [AuthGuard], path: 'dashboard', component: DashboardComponent},
  {canActivate: [AuthGuard], path: 'user-profile', component: UserProfileComponent},
  {canActivate: [AuthGuard], path: 'orders', component: OrdersComponent},
  {canActivate: [AuthGuard], path: 'maps', component: MapsComponent},
  {canActivate: [AuthGuard], path: 'coupons', component: CouponsComponent},
  {canActivate: [AuthGuard], path: 'services', component: ServicesComponent},
  {canActivate: [AuthGuard], path: 'settings', component: SettingsComponent},
  {canActivate: [AuthGuard], path: 'users', component: UsersComponent},
  {canActivate: [AuthGuard], path: 'add-order', component: AddOrderComponent},
  {canActivate: [AuthGuard], path: 'order-details/:id', component: OrderDetailsComponent},
  {canActivate: [AuthGuard], path: 'user-details/:id', component: UserDetailsComponent},
  {canActivate: [AuthGuard], path: 'add-user', component: AddUserComponent},
  {canActivate: [AuthGuard], path: 'coupon-details/:id', component: CouponDetailsComponent},
  {canActivate: [AuthGuard], path: 'service-details/:id', component: ServiceDetailsComponent},
  {canActivate: [AuthGuard], path: 'add-service', component: AddServicesComponent},
  {canActivate: [AuthGuard], path: 'add-coupon', component: AddCouponsComponent},
  {canActivate: [AuthGuard], path: 'setting-details/:id', component: SettingsDetailsComponent},
  {canActivate: [AuthGuard], path: 'add-setting', component: AddSettingsComponent},
  {canActivate: [AuthGuard], path: 'add-pricing', component: AddPricingComponent},
  {canActivate: [AuthGuard], path: 'pricing', component: PricingComponent},
  {canActivate: [AuthGuard], path: 'pricing-details/:id', component: PricingDetailsComponent},
  {canActivate: [AuthGuard], path: 'add-extra', component: AddExtrasComponent},
  {canActivate: [AuthGuard], path: 'extras', component: ExtrasComponent},
  {canActivate: [AuthGuard], path: 'extras-details/:id', component: ExtraDetailsComponent},
  {canActivate: [AuthGuard], path: 'add-charges', component: AddChargesComponent},
  {canActivate: [AuthGuard], path: 'charges', component: ChargesComponent},
  {canActivate: [AuthGuard], path: 'charge-details/:id', component: ChargeDetailsComponent},
  {canActivate: [AuthGuard], path: 'add-review', component: AddReviewComponent},
  {canActivate: [AuthGuard], path: 'reviews', component: ReviewsComponent},
  {canActivate: [AuthGuard], path: 'review-details/:id', component: ReviewDetailsComponent},
  {canActivate: [AuthGuard], path: 'add-payout', component: AddPayoutComponent},
  {canActivate: [AuthGuard], path: 'payouts', component: PayoutsComponent},
  {canActivate: [AuthGuard], path: 'payout-details/:id', component: PayoutDetailsComponent},
];
