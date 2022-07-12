export interface IProviderCreate {
  fantasy_name: string;
  name: string;
  cnpj: string;
  ie: string;
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}

export interface IProviderUpdate {
  fantasy_name?: string;
  name?: string;
  cnpj?: string;
  ie?: string;
  street?: string;
  number?: number;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
}
