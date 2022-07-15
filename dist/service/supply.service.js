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
exports.SupplyService = void 0;
const data_source_1 = require("../data-source");
const providers_entity_1 = require("../entities/providers.entity");
const supply_entity_1 = require("../entities/supply.entity");
const AppError_1 = require("../errors/AppError");
class SupplyService {
    static create({ buy_price, name, provider_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplyRepository = data_source_1.AppDataSource.getRepository(supply_entity_1.Supply);
            const providerRepository = data_source_1.AppDataSource.getRepository(providers_entity_1.Providers);
            if (!buy_price || !name || !provider_id) {
                throw new AppError_1.AppError(400, "Error in your request.");
            }
            const provider = yield providerRepository.findOne({
                where: { id: provider_id },
            });
            if (!provider) {
                throw new AppError_1.AppError(404, "Provider not found.");
            }
            const supply = yield supplyRepository.find();
            const supplyAvailability = supply.find((supply) => (supply.name = name));
            if (supplyAvailability) {
                throw new AppError_1.AppError(409, "supply already exists");
            }
            ;
            const newSupply = new supply_entity_1.Supply();
            (newSupply.name = name),
                (newSupply.buy_price = buy_price),
                (newSupply.provider = [provider]),
                supplyRepository.create(newSupply);
            yield supplyRepository.save(newSupply);
            return newSupply;
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            const supplyRepository = data_source_1.AppDataSource.getRepository(supply_entity_1.Supply);
            const supplyList = yield supplyRepository.find();
            return supplyList;
        });
    }
    static readOne(supply_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplyRepository = data_source_1.AppDataSource.getRepository(supply_entity_1.Supply);
            const supplyList = yield supplyRepository.find();
            if (!supply_id) {
                throw new AppError_1.AppError(400, "Error in your request.");
            }
            const supply = supplyList.find((supply) => supply.id === supply_id);
            if (!supply) {
                throw new AppError_1.AppError(404, "Supply not found");
            }
            return supply;
        });
    }
    static update(supply_id, { name, buy_price }) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplyRepository = data_source_1.AppDataSource.getRepository(supply_entity_1.Supply);
            const supplyList = yield supplyRepository.find();
            if (!supply_id) {
                throw new AppError_1.AppError(400, "Error in your request.");
            }
            const supply = supplyList.find((supply) => supply.id === supply_id);
            if (!supply) {
                throw new AppError_1.AppError(404, "Supply not found.");
            }
            yield supplyRepository.update(supply.id, { name, buy_price });
            return true;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplyRepository = data_source_1.AppDataSource.getRepository(supply_entity_1.Supply);
            const supplyList = yield supplyRepository.find();
            if (!id) {
                throw new AppError_1.AppError(400, "Error in your request.");
            }
            const supply = supplyList.find((supply) => supply.id === id);
            if (!supply) {
                throw new AppError_1.AppError(404, "Supply not found.");
            }
            yield supplyRepository.delete(supply.id);
            return true;
        });
    }
}
exports.SupplyService = SupplyService;
