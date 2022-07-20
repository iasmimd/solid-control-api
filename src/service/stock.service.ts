import { AppDataSource } from '../data-source';
import { Stock } from '../entities/stock.entity';
import { Supply } from '../entities/supply.entity';
import { AppError } from '../errors/AppError';
import { IStockCreate } from '../interfaces/stock';

class StockService {
  static create = async ({ qtd, supply_id }: IStockCreate) => {
    const userRepository = AppDataSource.getRepository(Stock);
    const supplyRepository = AppDataSource.getRepository(Supply);

    const stockList = await userRepository.find();
    const supply = await supplyRepository.findOne({ where: { id: supply_id } });

    const supplyAlreadyExist = stockList.find(
      (stock) => stock.supply.id === supply_id
    );

    if (supplyAlreadyExist) {
      const actualQtd = supplyAlreadyExist.qtd;
      const incomingQtd = qtd;

      const newTotal = actualQtd + incomingQtd;

      await this.update(supplyAlreadyExist.id, newTotal);

      return { message: 'Stock updated' };
    }

    if (supply) {
      const stock = new Stock();
      stock.qtd = qtd;
      stock.supply = supply;

      userRepository.create(stock);
      await userRepository.save(stock);

      return stock;
    } 
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

    if(!stock){
      throw new AppError(404, 'Stock not found')
    }

    return stock;
  };

  static update = async (id: string, qtd: number) => {
    const userRepository = AppDataSource.getRepository(Stock);

    const stock = await userRepository.findOne({ where: { id } });

    if (!stock) {
      throw new AppError(404, 'Stock not found');
    }
    await userRepository.update(stock!.id, { qtd });
    return true;
  };

  static delete = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Stock);

    const stockList = await userRepository.find();

    const stock = stockList.find((stock) => stock.id === id);

    if(!stock){
      throw new AppError(404, 'Stock not found' )
    }

    await userRepository.delete(stock!.id);

    return true;
  };
}

export default StockService;
