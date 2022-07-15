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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_service_1 = __importDefault(require("../service/orders.service"));
class OrdersController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { supplies, provider_id, total_price, status } = req.body;
            const order = yield orders_service_1.default.createNewOrder({ provider_id, supplies, total_price, status });
            return res.status(201).json(order);
        });
    }
    static read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const readAllOrders = yield orders_service_1.default.list();
            return res.status(200).json(readAllOrders);
        });
    }
    static readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const readOrder = yield orders_service_1.default.readOne(id);
            return res.status(200).json(readOrder);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = req.body;
            const { id } = req.params;
            yield orders_service_1.default.updateOrder(id, status);
            return res.status(204).json({ message: "Order updated with success" });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield orders_service_1.default.deleteOrder(id);
            return res.status(204).json({ message: "Order deleted with success" });
        });
    }
}
exports.default = OrdersController;
