import { AppDataSource } from "../data-source";
import { Providers } from "../entities/providers.entity";
import { Supply } from "../entities/supply.entity";
import { AppError } from "../errors/AppError";
import { ISupply } from "../interfaces/supply";

export class SupplyService {
  static async createSupplyService({
    buy_price,
    name,
    provider_id,
    order_id,
  }: ISupply) {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const providerRepository = AppDataSource.getRepository(Providers);

    const provider = await providerRepository.findOne({
      where: { id: provider_id },
    });

    if (!provider) {
      throw new AppError(404, "Provider not found.");
    }
    const newSupply = new Supply();
    (newSupply.name = name),
      (newSupply.buy_price = buy_price),
      newSupply.provider_id;

    supplyRepository.create(newSupply);
    await supplyRepository.save(newSupply);
  }
  static list = async () => {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const supplyList = await supplyRepository.find();

    return supplyList;
  };

  static readOne = async (supply_id: string) => {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const supplyList = await supplyRepository.find();

    const supply = supplyList.find((supply) => supply.id === supply_id);

    return supply;
  };

  static update = async ({ buy_price, name, supply_id }: ISupply) => {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const supplyList = await supplyRepository.find();

    const supply = supplyList.find((supply) => supply.id === supply_id);

    await supplyRepository.update(supply!.id, { buy_price, name });

    return true;
  };

  static delete = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Supply);
    const supplyList = await userRepository.find();

    const supply = supplyList.find((supply) => supply.id === id);

    await userRepository.delete(supply!.id);

    return true;
  };
}
