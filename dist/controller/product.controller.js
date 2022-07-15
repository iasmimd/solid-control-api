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
const product_service_1 = __importDefault(require("../service/product.service"));
class ProductController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const response = yield product_service_1.default.productCreateService(data);
            return res.status(201).json(response);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_id } = req.params;
            const data = req.body;
            const response = yield product_service_1.default.updateProductsService(product_id, data);
            return res.status(200).json(response);
        });
    }
    static read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield product_service_1.default.listProductsService();
            return res.status(200).json(response);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_id } = req.params;
            const response = yield product_service_1.default.deleteProductService(product_id);
            return res.status(200).json(response);
        });
    }
}
exports.default = ProductController;
