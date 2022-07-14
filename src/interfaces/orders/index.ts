export interface IOrder {
  supply_id: string;
  provider_id: string;
  total_price: number;
  status: string;

}

export interface IOrderUpdate {
  status: string;
}