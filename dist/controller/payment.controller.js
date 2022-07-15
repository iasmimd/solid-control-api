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
const AppError_1 = require("../errors/AppError");
const payment_service_1 = __importDefault(require("../service/payment.service"));
const mercadopago = require('mercadopago');
class PaymentController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email, description, amount } = req.params;
            const getFullUrl = (req) => {
                const url = req.protocol + '://' + req.get('host');
                return url;
            };
            const item = payment_service_1.default.createPaymentService(id, email, description, amount);
            mercadopago.configure({
                sandbox: process.env.SANDBOX == 'true' ? true : false,
                access_token: process.env.MP_ACCESS_TOKEN,
            });
            const purchaseOrder = {
                items: [item],
                payer: {
                    email: email,
                },
                auto_return: 'all',
                external_reference: id,
                payment_method: 'all',
                payment_type_id: 'all',
                back_urls: {
                    success: getFullUrl(req) + '/payments/success',
                    pending: getFullUrl(req) + '/payments/pending',
                    failure: getFullUrl(req) + '/payments/failure',
                },
            };
            try {
                const preference = yield mercadopago.preferences.create(purchaseOrder);
                return res.redirect(`${preference.body.init_point}`);
            }
            catch (err) {
                if (err instanceof AppError_1.AppError) {
                    return res.send(err.message);
                }
            }
        });
    }
}
exports.default = PaymentController;
