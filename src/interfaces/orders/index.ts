interface ISupplies {
  id: string;
  qtd: number;
}
export interface IOrder {
  supplies?: ISupplies[];
  provider_id: string;
}

export interface IOrderUpdate {
  status: string;
}
