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
const stock_entity_1 = require("../entities/stock.entity");
class StockService {
}
_a = StockService;
StockService.create = ({ qtd, supply_id }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(stock_entity_1.Stock);
    const stockList = yield userRepository.find();
    const supplyAlreadyExist = stockList.find((stock) => stock.supply_id.id === supply_id);
    if (supplyAlreadyExist) {
        throw new Error("This item already exist"); // Usar o atualizar
    }
    const stock = new stock_entity_1.Stock();
    stock.qtd = qtd;
    userRepository.create(stock);
    yield userRepository.save(stock);
    return stock;
});
StockService.list = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(stock_entity_1.Stock);
    const stockList = yield userRepository.find();
    return stockList;
});
StockService.readOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(stock_entity_1.Stock);
    const stockList = yield userRepository.find();
    const stock = stockList.find((stock) => stock.id === id);
    return stock;
});
StockService.update = (id, qtd) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(stock_entity_1.Stock);
    const stockList = yield userRepository.find();
    const stock = stockList.find((stock) => stock.id === id);
    yield userRepository.update(stock.id, { qtd });
    return true;
});
StockService.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(stock_entity_1.Stock);
    const stockList = yield userRepository.find();
    const stock = stockList.find((stock) => stock.id === id);
    yield userRepository.delete(stock.id);
    return true;
});
exports.default = StockService;
