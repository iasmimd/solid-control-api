import { AppDataSource } from "../data-source";
import { Adress } from "../entities/adress.entity";
import { IAdressCreate, IAdressUpdate } from "../interfaces/adress";

class AdressService {
  static async createAdress({
    number,
    street,
    complement,
    state,
    zip_code,
    country,
  }: IAdressCreate) {
    const userRepository = AppDataSource.getRepository(Adress);

    const newAdress = new Adress();
    newAdress.number = number;
    newAdress.street = street;
    newAdress.complement = complement;
    newAdress.state = state;
    newAdress.zip_code = zip_code;
    newAdress.country = country;

    userRepository.create(newAdress);
    await userRepository.save(newAdress);

    return newAdress;
  }

  static async readAdress(id: string) {
    const userRepository = AppDataSource.getRepository(Adress);

    const adress = userRepository.find();

    return adress;
  }

  static async updateAdress(
    { number, street, complement, state, zip_code, country }: IAdressUpdate,
    id: string
  ) {
    const userRepository = AppDataSource.getRepository(Adress);

    const adress = await userRepository.find();

    const account = adress.find((adress) => adress.id === id);

    if (!account) {
      throw new Error("Account not found");
    }

    Object.assign(account, {
      number,
      street,
      complement,
      state,
      zip_code,
      country,
    });

    await userRepository.update(account!.id, account);

    return true;
  }

  static async deleteAdress(id: string) {
    const userRepository = AppDataSource.getRepository(Adress);

    const adress = await userRepository.find();

    const account = adress.find((adress) => adress.id === id);

    await userRepository.delete(account!.id);

    return true;
  }
}

export default AdressService;
