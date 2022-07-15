import { Supply } from "../../entities/supply.entity";

interface ISupplies{
  id: string,
  qtd: number,
}
export interface IOrder {
  supplies?: ISupplies[];
  provider_id: string;
  total_price: number;
  status: string;

}

export interface IOrderUpdate {
  status: string;
}