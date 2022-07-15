"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product.controller"));
const routes = (0, express_1.Router)();
const productRouter = () => {
    routes.post('', product_controller_1.default.create);
    routes.get('', product_controller_1.default.read);
    routes.patch('/:product_id', product_controller_1.default.update);
    routes.delete('/:product_id', product_controller_1.default.delete);
    return routes;
};
exports.productRouter = productRouter;
