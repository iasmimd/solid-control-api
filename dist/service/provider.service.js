"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const providers_entity_1 = require("../entities/providers.entity");
const AppError_1 = require("../errors/AppError");
class ProviderService {
}
_a = ProviderService;
ProviderService.create = ({ fantasy_name, name, cnpj, ie, street, number, complement, district, city, state, country, zip_code, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(providers_entity_1.Providers);
    const providers = yield userRepository.find();
    const cnpjAlreadyExist = providers.find((provider) => provider.cnpj === cnpj);
    if (cnpjAlreadyExist) {
        throw new AppError_1.AppError(422, "This CNPJ already exist");
    }
    const provider = new providers_entity_1.Providers();
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
    yield userRepository.save(provider);
    return provider;
});
ProviderService.list = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(providers_entity_1.Providers);
    const providers = yield userRepository.find();
    return providers;
});
ProviderService.readOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(providers_entity_1.Providers);
    const providers = yield userRepository.find();
    const provider = providers.find((provider) => provider.id === id);
    if (!provider) {
        throw new AppError_1.AppError(404, "Provider not found");
    }
    return provider;
});
ProviderService.update = (id, { fantasy_name, name, cnpj, ie, street, number, complement, district, city, state, country, zip_code, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(providers_entity_1.Providers);
    const providers = yield userRepository.find();
    const provider = providers.find((provider) => provider.id === id);
    if (!provider) {
        throw new AppError_1.AppError(404, "Provider not found");
    }
    yield userRepository.update(provider.id, {
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
});
ProviderService.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(providers_entity_1.Providers);
    const providers = yield userRepository.find();
    const provider = providers.find((provider) => provider.id === id);
    if (!provider) {
        throw new AppError_1.AppError(404, "Provider not found");
    }
    yield userRepository.delete(provider.id);
    return true;
});
exports.default = ProviderService;
