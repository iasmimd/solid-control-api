import { AppDataSource } from "../data-source";
import { Stock } from "../entities/stock.entity";
import { IStockCreate } from "../interfaces/stock";

class StockService {
  static create = async ({ qtd, supply_id }: IStockCreate) => {
    const userRepository = AppDataSource.getRepository(Stock);

    const stockList = await userRepository.find();

    const supplyAlreadyExist = stockList.find(
      (stock) => stock.supply_id.id === supply_id
    );

    if (supplyAlreadyExist) {
      throw new Error("This item already exist"); // Usar o atualizar
    }

    const stock = new Stock();
    stock.qtd = qtd;

    userRepository.create(stock);
    await userRepository.save(stock);

    return stock;
  };

  static list = async () => {
    const userRepository = AppDataSource.getRepository(Stock);
    const stockList = await userRepository.find();

    return stockList;
  };

  static readOne = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Stock);
    const stockList = await userRepository.find();

    const stock = stockList.find((stock) => stock.id === id);

    return stock;
  };

  static update = async (id: string, qtd: number) => {
    const userRepository = AppDataSource.getRepository(Stock);
    const stockList = await userRepository.find();

    const stock = stockList.find((stock) => stock.id === id);

    await userRepository.update(stock!.id, { qtd });

    return true;
  };

  static delete = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Stock);
    const stockList = await userRepository.find();

    const stock = stockList.find((stock) => stock.id === id);

    await userRepository.delete(stock!.id);

    return true;
  };
}

export default StockService
