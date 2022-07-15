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
exports.CartService = void 0;
const data_source_1 = require("../data-source");
const cart_entity_1 = require("../entities/cart.entity");
const products_entity_1 = require("../entities/products.entity");
const user_entity_1 = require("../entities/user.entity");
const AppError_1 = require("../errors/AppError");
const utils_1 = require("../utils");
class CartService {
    static addCartService({ product_id, userEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartRepository = data_source_1.AppDataSource.getRepository(cart_entity_1.Cart);
            const productRepository = data_source_1.AppDataSource.getRepository(products_entity_1.Product);
            const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const user = yield userRepository.findOne({ where: { email: userEmail } });
            if (!user) {
                throw new AppError_1.AppError(404, "User  not found");
            }
            const cart = yield cartRepository.findOne({ where: { id: user === null || user === void 0 ? void 0 : user.cart.id } });
            if (!cart) {
                throw new AppError_1.AppError(404, "User cart not found");
            }
            const product = yield productRepository.findOne({ where: { id: product_id } });
            if (!product) {
                throw new AppError_1.AppError(404, "Product not found");
            }
            if (cart && product) {
                if (cart.products.filter((prod) => prod.name === product.name).length > 0) {
                    throw new AppError_1.AppError(409, "Product is already in the cart");
                }
                cart.products = [...cart.products, product];
                cart.subtotal = (0, utils_1.fixedFloat)(cart.subtotal + product.price);
                yield cartRepository.save(cart);
                return cart;
            }
        });
    }
    static DeleteCartItem({ product_id, userEmail }) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartRepository = data_source_1.AppDataSource.getRepository(cart_entity_1.Cart);
            const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const user = yield userRepository.findOne({
                where: {
                    email: userEmail
                }
            });
            const cart = yield cartRepository.findOne({
                where: {
                    id: user === null || user === void 0 ? void 0 : user.cart.id
                }
            });
            if (cart) {
                if (cart.products.filter(prod => prod.id === product_id).length === 0) {
                    throw new AppError_1.AppError(404, "Product is not in the cart");
                }
                cart.products = cart.products.filter(prod => prod.id !== product_id);
                cart.subtotal = (0, utils_1.fixedFloat)(cart.products.reduce((acc, prod) => acc + prod.price, 0));
                yield cartRepository.save(cart);
                return;
            }
        });
    }
}
exports.CartService = CartService;
