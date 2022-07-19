export interface ISupply {
  name: string;
  buy_price: number;
  provider_id: string;
}

export interface ISupplyUpdate {
  name?: string;
  buy_price?: number;
}
