"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = require("express");
const cart_controller_1 = require("../controller/cart.controller");
const authToken_middleware_1 = require("../middleware/authToken.middleware");
const routes = (0, express_1.Router)();
const cartRoutes = () => {
    routes.post('/:product_id', authToken_middleware_1.authToken, cart_controller_1.CartController.create);
    routes.delete('', authToken_middleware_1.authToken, cart_controller_1.CartController.delete);
    return routes;
};
exports.cartRoutes = cartRoutes;
