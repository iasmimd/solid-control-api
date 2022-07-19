import { AppDataSource } from "../data-source";
import { Providers } from "../entities/providers.entity";
import { AppError } from "../errors/AppError";
import { IProviderCreate, IProviderUpdate } from "../interfaces/provider";

class ProviderService {
  static create = async ({
    fantasy_name,
    name,
    cnpj,
    ie,
    street,
    number,
    complement,
    district,
    city,
    state,
    country,
    zip_code,
  }: IProviderCreate) => {
    const userRepository = AppDataSource.getRepository(Providers);

    const providers = await userRepository.find();

    const cnpjAlreadyExist = providers.find(
      (provider) => provider.cnpj === cnpj
    );

    if (cnpjAlreadyExist) {
      throw new AppError(409, "This CNPJ already exist");
    }

    const provider = new Providers();
    provider.fantasy_name = fantasy_name;
    provider.name = name;
    provider.cnpj = cnpj;
    provider.ie = ie;
    provider.street = street;
    provider.number = number;
    provider.complement = complement;
    provider.district = district;
    provider.city = city;
    provider.state = state;
    provider.country = country;
    provider.zip_code = zip_code;

    userRepository.create(provider);
    await userRepository.save(provider);

    return provider;
  };

  static list = async () => {
    const userRepository = AppDataSource.getRepository(Providers);

    const providers = await userRepository.find();

    return providers;
  };

  static readOne = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Providers);

    const providers = await userRepository.find();

    const provider = providers.find((provider) => provider.id === id);

    if (!provider) {
      throw new AppError(404, "Provider not found");
    }

    return provider;
  };

  static update = async (
    id: string,
    {
      fantasy_name,
      name,
      cnpj,
      ie,
      street,
      number,
      complement,
      district,
      city,
      state,
      country,
      zip_code,
    }: IProviderUpdate
  ) => {
    const userRepository = AppDataSource.getRepository(Providers);

    const providers = await userRepository.find();

    const provider = providers.find((provider) => provider.id === id);

    if (!provider) {
      throw new AppError(404, "Provider not found");
    }

    await userRepository.update(provider!.id, {
      fantasy_name,
      name,
      cnpj,
      ie,
      street,
      number,
      complement,
      district,
      city,
      state,
      country,
      zip_code,
    });

    return true;
  };

  static delete = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Providers);

    const providers = await userRepository.find();

    const provider = providers.find((provider) => provider.id === id);

    if (!provider) {
      throw new AppError(404, "Provider not found");
    }

    await userRepository.delete(provider!.id);

    return true;
  };
}

export default ProviderService;
