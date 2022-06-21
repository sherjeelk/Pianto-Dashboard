
  export interface User {
    notes: any;
    slots: any[];
    lastName: string;
    active: boolean;
    blocked: boolean;
    country: string;
    rate: number;
    role: string;
    email: string;
    name: string;
    id: string;
    city: any;
    postcode: string;
    phone: string;
    password: string;
    calendar: string;
  }
  export interface AllUser {
    results: User[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  }
