export interface IAddressCreate {
  number: number;
  street: string;
  complement: string;
  state: string;
  zip_code: number;
  country: string;
}

export interface IAddressUpdate {
  number?: number;
  street?: string;
  complement?: string;
  state?: string;
  zip_code?: number;
  country?: string;
} 

