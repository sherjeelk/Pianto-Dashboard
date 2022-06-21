
  export interface Price {
    name_fi: string;
    enable: boolean;
    _id: string;
    name: string;
    value: number;
    type: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }

  export interface Pricing {
    results: Price[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  }

