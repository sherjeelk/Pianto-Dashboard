import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppConstants} from '../AppConstants';
import {LoginResponse} from '../models/LoginResponse';
import {catchError} from 'rxjs/operators';
import {AllUser, User} from '../models/UserDetail';
import {Coupon, Coupons} from '../models/Coupons';
import {Service, Services} from '../models/Services';
import {Setting, Settings} from '../models/settings';
import {Order, Orders} from '../models/Orders';
import {Charges} from '../models/Charges';
import {Price, Pricing} from '../models/Pricing';
import {Charge} from '../models/Charges';
import {Extra, Extras} from '../models/Extras';
import {Payout, Payouts} from '../models/Payouts';
import {Review, Reviews} from '../models/Reviews';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.setHeaders();
  }

  setHeaders(){
    console.log(localStorage.getItem('token'));
    this.headers = this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  // Get requests
  getAllUsers(): Observable<AllUser> {
    return this.http.get<AllUser>(AppConstants.URLS.All_USERS, {headers: this.headers});
  }

  getUsersByPage(index: any): Observable<AllUser> {
    return this.http.get<AllUser>(AppConstants.URLS.All_USERS + '?page=' + index, {headers: this.headers});
  }

  getAllCoupons(): Observable<Coupons> {
    return this.http.get<Coupons>(AppConstants.URLS.All_COUPONS, {headers: this.headers});
  }

  getAllCouponsByPage(index: any): Observable<Coupons> {
    return this.http.get<Coupons>(AppConstants.URLS.All_COUPONS + '?page=' + index, {headers: this.headers});
  }

  getAllServices(): Observable<Services> {
    return this.http.get<Services>(AppConstants.URLS.All_SERVICES, {headers: this.headers});
  }

  getAllServicesByPage(index: any): Observable<Services> {
    return this.http.get<Services>(AppConstants.URLS.All_SERVICES + '?page=' + index, {headers: this.headers});
  }

  getAllSettings(): Observable<Settings> {
    return this.http.get<Settings>(AppConstants.URLS.All_SETTINGS, {headers: this.headers});
  }

  getAllSettingsByPage(index: any): Observable<Settings> {
    return this.http.get<Settings>(AppConstants.URLS.All_SETTINGS + '?page=' + index, {headers: this.headers});
  }

  getAllOrders(): Observable<Orders> {
    return this.http.get<Orders>(AppConstants.URLS.All_ORDERS, {headers: this.headers});
  }

  getAllPricing(): Observable<Pricing> {
    return this.http.get<Pricing>(AppConstants.URLS.All_PRICING, {headers: this.headers});
  }

  getAllPricingByPage(index: any): Observable<Pricing> {
    return this.http.get<Pricing>(AppConstants.URLS.All_PRICING + '?page=' + index, {headers: this.headers});
  }

  getAllReviews(): Observable<Reviews> {
    return this.http.get<Reviews>(AppConstants.URLS.All_REVIEWS, {headers: this.headers});
  }

  getAllReviewsByPage(index: any): Observable<Reviews> {
    return this.http.get<Reviews>(AppConstants.URLS.All_REVIEWS + '?page=' + index, {headers: this.headers});
  }

  getAllPayouts(): Observable<Payouts> {
    return this.http.get<Payouts>(AppConstants.URLS.All_PAYOUTS, {headers: this.headers});
  }

  getAllPayoutsByPage(index: any): Observable<Payouts> {
    return this.http.get<Payouts>(AppConstants.URLS.All_PAYOUTS + '?page=' + index, {headers: this.headers});
  }

  getAllExtras(): Observable<Extras> {
    return this.http.get<Extras>(AppConstants.URLS.All_EXTRAS, {headers: this.headers});
  }

  getAllExtraByPage(index: any): Observable<Extras> {
    return this.http.get<Extras>(AppConstants.URLS.All_EXTRAS + '?page=' + index, {headers: this.headers});
  }

  getAllCharges(): Observable<Charges> {
    return this.http.get<Charges>(AppConstants.URLS.All_CHARGES, {headers: this.headers});
  }

  getAllChargesByPage(index: any): Observable<Charges> {
    return this.http.get<Charges>(AppConstants.URLS.All_CHARGES + '?page=' + index, {headers: this.headers});
  }

  getOrdersByPage(index: any): Observable<Orders> {
    return this.http.get<Orders>(AppConstants.URLS.All_ORDERS + '?page=' + index, {headers: this.headers});

  }

  getUser(id): Observable<User> {
    return this.http.get<User>(AppConstants.URLS.All_USERS + '/' + id, {headers: this.headers});
  }

  getOrder(id): Observable<Order> {
    return this.http.get<Order>(AppConstants.URLS.All_ORDERS + '/' + id, {headers: this.headers});
  }

  getCoupon(id): Observable<Coupon> {
    return this.http.get<Coupon>(AppConstants.URLS.All_COUPONS + '/' + id, {headers: this.headers});
  }

  getService(id): Observable<Service> {
    return this.http.get<Service>(AppConstants.URLS.All_SERVICES + '/' + id, {headers: this.headers});
  }

  getSetting(id): Observable<Setting> {
    return this.http.get<Setting>(AppConstants.URLS.All_SETTINGS + '/' + id, {headers: this.headers});
  }

  getPricing(id): Observable<Price> {
    return this.http.get<Price>(AppConstants.URLS.All_PRICING + '/' + id, {headers: this.headers});
  }

  getReviews(id): Observable<Review> {
    return this.http.get<Review>(AppConstants.URLS.All_REVIEWS + '/' + id, {headers: this.headers});
  }

  getPayout(id): Observable<Payout> {
    return this.http.get<Payout>(AppConstants.URLS.All_PAYOUTS + '/' + id, {headers: this.headers});
  }

  getExtra(id): Observable<Extra> {
    return this.http.get<Extra>(AppConstants.URLS.All_EXTRAS + '/' + id, {headers: this.headers});
  }
  getCharges(id): Observable<Charge> {
    return this.http.get<Charge>(AppConstants.URLS.All_CHARGES + '/' + id, {headers: this.headers});
  }

  // Post requests

  addUser(body): Observable<AllUser> {
    return this.http.post<AllUser>(AppConstants.URLS.All_USERS, body, {headers: this.headers});
  }

  addSetting(body): Observable<Setting> {
    return this.http.post<Setting>(AppConstants.URLS.All_SETTINGS, body, {headers: this.headers});
  }

  addService(body): Observable<Service> {
    return this.http.post<Service>(AppConstants.URLS.All_SERVICES, body, {headers: this.headers});
  }

  addCoupon(body): Observable<Coupon> {
    return this.http.post<Coupon>(AppConstants.URLS.All_COUPONS, body, {headers: this.headers});
  }

  addOrder(body): Observable<Order> {
    return this.http.post<Order>(AppConstants.URLS.All_ORDERS, body, {headers: this.headers});
  }

  addPayout(body): Observable<Payout> {
    return this.http.post<Payout>(AppConstants.URLS.All_PAYOUTS, body, {headers: this.headers});
  }

  addPricing(body): Observable<Price> {
    return this.http.post<Price>(AppConstants.URLS.All_PRICING, body, {headers: this.headers});
  }

  addReview(body): Observable<Review> {
    return this.http.post<Review>(AppConstants.URLS.All_REVIEWS, body, {headers: this.headers});
  }

  addExtra(body): Observable<Extra> {
    return this.http.post<Extra>(AppConstants.URLS.All_EXTRAS, body, {headers: this.headers});
  }

  addCharges(body): Observable<Charge> {
    return this.http.post<Charge>(AppConstants.URLS.All_CHARGES, body, {headers: this.headers});
  }

  login(email, password): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(AppConstants.URLS.LOGIN, {email, password}).pipe(catchError(this.handleError));

  }

  // Delete requests
  deleteUser(id): Observable<User> {
    return this.http.delete<User>(AppConstants.URLS.All_USERS + '/' + id, {headers: this.headers});
  }

  deleteSetting(id): Observable<Setting> {
    return this.http.delete<Setting>(AppConstants.URLS.All_SETTINGS + '/' + id, {headers: this.headers});
  }

  deleteCoupon(id): Observable<Coupon> {
    return this.http.delete<Coupon>(AppConstants.URLS.All_COUPONS + '/' + id, {headers: this.headers});
  }

  deleteService(id): Observable<Coupon> {
    return this.http.delete<Coupon>(AppConstants.URLS.All_SERVICES + '/' + id, {headers: this.headers});
  }

  deleteOrder(id): Observable<Order> {
    return this.http.delete<Order>(AppConstants.URLS.All_ORDERS + '/' + id, {headers: this.headers});
  }
  deletePrice(id): Observable<Price> {
    return this.http.delete<Price>(AppConstants.URLS.All_PRICING + '/' + id, {headers: this.headers});
  }
  deleteReview(id): Observable<Review> {
    return this.http.delete<Review>(AppConstants.URLS.All_REVIEWS + '/' + id, {headers: this.headers});
  }
  deletePayout(id): Observable<Payout> {
    return this.http.delete<Payout>(AppConstants.URLS.All_PAYOUTS + '/' + id, {headers: this.headers});
  }
  deleteExtra(id): Observable<Extra> {
    return this.http.delete<Extra>(AppConstants.URLS.All_EXTRAS + '/' + id, {headers: this.headers});
  }
  deleteCharge(id): Observable<Charge> {
    return this.http.delete<Charge>(AppConstants.URLS.All_CHARGES + '/' + id, {headers: this.headers});
  }

  // Put Requests

  updateUser(id, body): Observable<User> {
    return this.http.put<User>(AppConstants.URLS.All_USERS + '/' + id, body, {headers: this.headers});
  }

  updateSetting(id, body): Observable<Setting> {
    return this.http.put<Setting>(AppConstants.URLS.All_SETTINGS + '/' + id, body, {headers: this.headers});
  }

  updateCoupon(id, body): Observable<Coupon> {
    return this.http.put<Coupon>(AppConstants.URLS.All_COUPONS + '/' + id, body, {headers: this.headers});
  }

  updateService(id, body): Observable<Service> {
    return this.http.put<Service>(AppConstants.URLS.All_SERVICES + '/' + id, body, {headers: this.headers});
  }

  updateOrder(id, body): Observable<Order> {
    return this.http.put<Order>(AppConstants.URLS.All_ORDERS + '/' + id, body, {headers: this.headers});
  }

  updatePricing(id, body): Observable<Price> {
    return this.http.put<Price>(AppConstants.URLS.All_PRICING + '/' + id, body, {headers: this.headers});
  }

  updateReview(id, body): Observable<Review> {
    return this.http.put<Review>(AppConstants.URLS.All_REVIEWS + '/' + id, body, {headers: this.headers});
  }

  updatePayout(id, body): Observable<Payout> {
    return this.http.put<Payout>(AppConstants.URLS.All_PAYOUTS + '/' + id, body, {headers: this.headers});
  }

  updateExtra(id, body): Observable<Extra> {
    return this.http.put<Extra>(AppConstants.URLS.All_EXTRAS + '/' + id, body, {headers: this.headers});
  }

  sendEmail(body): Observable<any> {
    return this.http.post<any>(AppConstants.URLS.All_EXTRAS + '/sendEmail', body, {headers: this.headers});
  }

  sendNotification(body): Observable<any> {
    return this.http.post<any>(AppConstants.URLS.SEND_NOTIFICATIONS, body, {headers: this.headers});
  }

  updateCharges(id, body): Observable<Charge> {
    return this.http.put<Charge>(AppConstants.URLS.All_CHARGES + '/' + id, body, {headers: this.headers});
  }

  getAllSearchInExtras(body): Observable<Extra[]> {
    return this.http.post<Extra[]>(AppConstants.URLS.All_EXTRAS + '/search', body);
  }
  getAllSearchInOrder(body): Observable<Order[]> {
    return this.http.post<Order[]>(AppConstants.URLS.All_ORDERS + '/search', body,  {headers: this.headers});
  }

  getAllSearchInUsers(body): Observable<User[]> {
    return this.http.post<User[]>(AppConstants.URLS.All_USERS + '/search', body,  {headers: this.headers});
  }

  getAllReviewsType(): Observable<Extras> {
    return this.http.get<Extras>(AppConstants.URLS.All_EXTRAS + '?type=review');
  }
  getQuestionsFromExtras(): Observable<Extras> {
    return this.http.get<Extras>(AppConstants.URLS.All_EXTRAS + '?type=question');
  }
  // Error Handling
  handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.status === 401) {
        errorMessage = 'Your password id incorrect or you do not have access to this resource!';
        // Now you can show error if you know about it already!
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }



}
