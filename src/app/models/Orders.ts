
  export interface Charges {
    charge: string;
  }

  export interface Service {
    name: string;
  }

  export interface Order {
    notes: any;
    contactCustomer: boolean;
    extended: boolean;
    questions: object[];
    user: string;
    serial: string;
    lastService: string;
    status: string;
    phone: string;
    total: number;
    created: Date;
    date: Date;
    _id: string;
    address: string;
    charges: Charges;
    cancellationNote: string;
    city: string;
    coupon: string;
    time: string;
    discount: number;
    email: string;
    name: string;
    pianoName: string;
    paymentMethod: string;
    postcode: string;
    service: Service;
    serviceMan: string;
    subtotal: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }

  export interface Orders {
    results: Order[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  }

