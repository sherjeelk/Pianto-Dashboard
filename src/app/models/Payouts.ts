
  export interface Payout {
    enable: boolean;
    _id: string;
    name: string;
    bank: string;
    swift: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }

  export interface Payouts {
    results: Payout[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  }



