import { AppDataSource } from '../data-source';
import { Providers } from '../entities/providers.entity';
import { Supply } from '../entities/supply.entity';
import { AppError } from '../errors/AppError';
import { ISupply, ISupplyUpdate } from '../interfaces/supply';

export class SupplyService {
  static async create({ buy_price, name, provider_id }: ISupply) {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const providerRepository = AppDataSource.getRepository(Providers);
    if (!buy_price || !name || !provider_id) {
      throw new AppError(400, 'Error in your request.');
    }

    const provider = await providerRepository.findOne({
      where: { id: provider_id },
    });

    if (!provider) {
      throw new AppError(404, 'Provider not found.');
    }

    const supply = await supplyRepository.find();

    const supplyAvailability = supply.find((supply) => supply.name === name);

    if (supplyAvailability) {
      throw new AppError(409, 'supply already exists');
    }

    const newSupply = new Supply();
    (newSupply.name = name),
      (newSupply.buy_price = buy_price),
      (newSupply.provider = [provider]),
      supplyRepository.create(newSupply);
    await supplyRepository.save(newSupply);

    return newSupply;
  }

  static async list() {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const supplyList = await supplyRepository.find();

    return supplyList;
  }

  static async readOne(supply_id: string) {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const supplyList = await supplyRepository.find();
    if (!supply_id) {
      throw new AppError(400, 'Error in your request.');
    }

    const supply = supplyList.find((supply) => supply.id === supply_id);

    if (!supply) {
      throw new AppError(404, 'Supply not found');
    }

    return supply;
  }

  static async update(supply_id: string, { name, buy_price }: ISupplyUpdate) {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const supplyList = await supplyRepository.find();

    if (!supply_id) {
      throw new AppError(400, 'Error in your request.');
    }
    const supply = supplyList.find((supply) => supply.id === supply_id);

    if (!supply) {
      throw new AppError(404, 'Supply not found.');
    }
    await supplyRepository.update(supply!.id, { name, buy_price });

    return true;
  }

  static async delete(id: string) {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const supplyList = await supplyRepository.find();

    if (!id) {
      throw new AppError(400, 'Error in your request.');
    }

    const supply = supplyList.find((supply) => supply.id === id);
    if (!supply) {
      throw new AppError(404, 'Supply not found.');
    }
    await supplyRepository.delete(supply!.id);

    return true;
  }
}
