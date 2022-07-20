export interface IProduct {
  id?: string;
  supplies?: any;
  name: string;
  description: string;
  price: number;
  img: string;
}

export interface ISupplyArray {
  qtd: number;
  id: string;
}
