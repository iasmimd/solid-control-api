export interface IOrder {
  total_price: number;
  status: string;
  supplies: [];

}

export interface IOrderUpdate {
  status: string;
}