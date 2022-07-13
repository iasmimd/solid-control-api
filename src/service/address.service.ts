import { AppDataSource } from "../data-source";
import { Address } from "../entities/address.entity";

import { IAddressCreate, IAddressUpdate } from "../interfaces/address/index";

class AddressService {
  static async createAddress({
    number,
    street,
    complement,
    state,
    zip_code,
    country,
  }: IAddressCreate) {
    const userRepository = AppDataSource.getRepository(Address);

    const newAddress = new Address();
    newAddress.number = number;
    newAddress.street = street;
    newAddress.complement = complement;
    newAddress.state = state;
    newAddress.zip_code = zip_code;
    newAddress.country = country;

    userRepository.create(newAddress);
    await userRepository.save(newAddress);

    return newAddress;
  }

  static async readAddress(id: string) {
    const userRepository = AppDataSource.getRepository(Address);

    const address = await userRepository.findOne({
        where: {
          id: id
        }
      });

      if(!address){
        throw new Error("User not found")
      }

    return address;
  }

  static async updateAddress(
    { number, street, complement, state, zip_code, country }: IAddressUpdate,
    id: string
  ) {
    const userRepository = AppDataSource.getRepository(Address);

    const address = await userRepository.find();

    const account = address.find((address) => address.id === id);

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

  static async deleteAddress(id: string) {
    const userRepository = AppDataSource.getRepository(Address);

    const address = await userRepository.find();

    const account = address.find((address) => address.id === id);

    await userRepository.delete(account!.id);

    return true;
  }
}

export default AddressService;
