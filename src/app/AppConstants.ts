export class AppConstants {
 public static BASE_URL = 'https://api.pianto.io';
 // public static BASE_URL = 'https://test-api.pianto.io';
  public static URLS = {
    LOGIN: AppConstants.BASE_URL + '/v1/auth/login',
    REGISTER: AppConstants.BASE_URL + '/v1/auth/register',
    All_USERS: AppConstants.BASE_URL + '/v1/users',
    All_SETTINGS: AppConstants.BASE_URL + '/v1/settings',
    All_SERVICES: AppConstants.BASE_URL + '/v1/services',
    All_COUPONS: AppConstants.BASE_URL + '/v1/coupons',
    All_ORDERS: AppConstants.BASE_URL + '/v1/orders',
    All_PRICING: AppConstants.BASE_URL + '/v1/pricing',
    All_REVIEWS: AppConstants.BASE_URL + '/v1/reviews',
    All_PAYOUTS: AppConstants.BASE_URL + '/v1/payouts',
    All_CHARGES: AppConstants.BASE_URL + '/v1/charges',
    All_EXTRAS: AppConstants.BASE_URL + '/v1/extras',
    SEND_NOTIFICATIONS: AppConstants.BASE_URL + '/v1/extras/sendNotification',
  };
}
