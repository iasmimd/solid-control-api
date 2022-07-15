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
const user_entity_1 = require("../entities/user.entity");
const AppError_1 = require("../errors/AppError");
class PaymentService {
    static createPaymentService(user_id, email, description, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const user = yield userRepository.findOne({ where: { id: user_id } });
            if (!user) {
                throw new AppError_1.AppError(404, "user notfound");
            }
            if (!user_id || !email || !description || !amount) {
                throw new AppError_1.AppError(404, "Error in your request");
            }
            const item = {
                orderId: user.id,
                title: description,
                description: `${description}`,
                quantity: 1,
                currency_id: "BRL",
                unit_price: parseFloat(amount),
            };
            return item;
        });
    }
}
exports.default = PaymentService;
