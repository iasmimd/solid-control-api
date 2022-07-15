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
const products_entity_1 = require("../entities/products.entity");
const AppError_1 = require("../errors/AppError");
class ProductService {
    static productCreateService({ supplies, name, price, img }) {
        return __awaiter(this, void 0, void 0, function* () {
            // const supplyRepository = AppDataSource.getRepository(Supply)
            // const stockRepository = AppDataSource.getRepository(Stock)
            const productRepository = data_source_1.AppDataSource.getRepository(products_entity_1.Product);
            const products = yield productRepository.find();
            const productAvailability = products.find((product) => (product.name = name));
            if (!supplies || !name || !price || !img) {
                throw new AppError_1.AppError(400, "Error in your request");
            }
            if (productAvailability) {
                throw new AppError_1.AppError(409, "product already exists");
            }
            const newProduct = productRepository.create({
                supplies,
                name,
                price,
                img,
            });
            yield productRepository.save(newProduct);
            return newProduct;
        });
    }
    static listProductsService() {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = data_source_1.AppDataSource.getRepository(products_entity_1.Product);
            const products = yield productRepository.find();
            if (!products) {
                throw new AppError_1.AppError(404, "products not found");
            }
            return products;
        });
    }
    static updateProductsService(product_id, { img, name, price, supplies }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!supplies || !name || !price || !img) {
                throw new AppError_1.AppError(400, "Error in your request");
            }
            const productRepository = data_source_1.AppDataSource.getRepository(products_entity_1.Product);
            const product = yield productRepository.findOne({
                where: { id: product_id },
            });
            if (!product) {
                throw new AppError_1.AppError(404, "products not found");
            }
            yield productRepository.update(product_id, { name, supplies, price, img });
            return { message: "Product updated." };
        });
    }
    static deleteProductService(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = data_source_1.AppDataSource.getRepository(products_entity_1.Product);
            const product = yield productRepository.findOne({
                where: { id: product_id },
            });
            if (!product) {
                throw new AppError_1.AppError(404, "products not found");
            }
            yield productRepository.delete(product.id);
            return { message: "Product as deleted" };
        });
    }
}
exports.default = ProductService;
