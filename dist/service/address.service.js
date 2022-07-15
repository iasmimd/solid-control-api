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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const address_entity_1 = require("../entities/address.entity");
const AppError_1 = require("../errors/AppError");
class AddressService {
    static createAddress({ number, street, complement, state, zip_code, country, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(address_entity_1.Address);
            const newAddress = new address_entity_1.Address();
            newAddress.number = number;
            newAddress.street = street;
            newAddress.complement = complement;
            newAddress.state = state;
            newAddress.zip_code = zip_code;
            newAddress.country = country;
            userRepository.create(newAddress);
            yield userRepository.save(newAddress);
            return newAddress;
        });
    }
    static readAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(address_entity_1.Address);
            const address = yield userRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!address) {
                throw new AppError_1.AppError(404, 'User not found');
            }
            return address;
        });
    }
    static updateAddress({ number, street, complement, state, zip_code, country }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(address_entity_1.Address);
            const address = yield userRepository.find();
            const account = address.find((address) => address.id === id);
            if (!account) {
                throw new AppError_1.AppError(404, 'Account not found');
            }
            Object.assign(account, {
                number,
                street,
                complement,
                state,
                zip_code,
                country,
            });
            yield userRepository.update(account.id, account);
            return true;
        });
    }
    static deleteAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(address_entity_1.Address);
            const address = yield userRepository.find();
            const account = address.find((address) => address.id === id);
            yield userRepository.delete(account.id);
            return true;
        });
    }
}
exports.default = AddressService;
