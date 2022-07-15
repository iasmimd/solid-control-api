import { Supply } from "../../entities/supply.entity";

export interface IOrder {
  supplies?: string[];
  provider_id: string;
  total_price: number;
  status: string;

}

export interface IOrderUpdate {
  status: string;
}