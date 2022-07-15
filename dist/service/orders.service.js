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
const orders_entity_1 = require("../entities/orders.entity");
const providers_entity_1 = require("../entities/providers.entity");
const supply_entity_1 = require("../entities/supply.entity");
const AppError_1 = require("../errors/AppError");
class OrdersService {
    static createNewOrder({ supplies, provider_id, total_price, status, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const ordersRepository = data_source_1.AppDataSource.getRepository(orders_entity_1.Orders);
            const supplyRepository = data_source_1.AppDataSource.getRepository(supply_entity_1.Supply);
            const providerRepository = data_source_1.AppDataSource.getRepository(providers_entity_1.Providers);
            if (!supplies || !provider_id || !total_price || !status) {
                throw new AppError_1.AppError(400, "Requisition body is incomplete or empty ");
            }
            const listSupplies = [];
            let allSupplies = supplies.map((elem) => __awaiter(this, void 0, void 0, function* () {
                const supply = yield supplyRepository.findOne({
                    where: { id: elem.id },
                });
                if (supply) {
                    supply.qtd = elem.qtd;
                    listSupplies.push(supply);
                }
            }));
            yield Promise.all(allSupplies);
            const provider = yield providerRepository.findOne({
                where: {
                    id: provider_id,
                },
            });
            if (provider) {
                const order = new orders_entity_1.Orders();
                order.total_price = total_price;
                order.status = status;
                order.provider = provider;
                order.supplies = listSupplies;
                const newOrder = ordersRepository.create(order);
                yield ordersRepository.save(newOrder);
                return newOrder;
            }
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            const orderRepository = data_source_1.AppDataSource.getRepository(orders_entity_1.Orders);
            const orderList = yield orderRepository.find();
            return orderList;
        });
    }
    static readOne(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderRepository = data_source_1.AppDataSource.getRepository(orders_entity_1.Orders);
            const orderList = yield orderRepository.find();
            if (!order_id) {
                throw new AppError_1.AppError(400, "Error in your request.");
            }
            const order = orderList.find((order) => order.id === order_id);
            return order;
        });
    }
    static updateOrder(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const ordersRepository = data_source_1.AppDataSource.getRepository(orders_entity_1.Orders);
            const order = yield ordersRepository.findOneBy({ id });
            if (!order) {
                throw new AppError_1.AppError(404, "Order not found");
            }
            yield ordersRepository.update(order.id, {
                status: data.status,
            });
            return true;
        });
    }
    static deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ordersRepository = data_source_1.AppDataSource.getRepository(orders_entity_1.Orders);
            const order = yield ordersRepository.findOneBy({ id });
            if (!order) {
                throw new AppError_1.AppError(404, "Order not found");
            }
            yield ordersRepository.delete(order.id);
            return true;
        });
    }
}
exports.default = OrdersService;
