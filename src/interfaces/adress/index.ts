export interface IAdressCreate {
    number: number;
    street: string;
    complement: string;
    state: string;
    zip_code: number;
    country: string;
  }

  export interface IAdressUpdate {
    number?: number;
    street?: string;
    complement?: string;
    state?: string;
    zip_code?: number;
    country?: string;
  }