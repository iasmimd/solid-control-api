"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = exports.routes = void 0;
const express_1 = require("express");
const orders_controller_1 = __importDefault(require("../controller/orders.controller"));
exports.routes = (0, express_1.Router)();
const orderRoutes = () => {
    // routes.post('', isAdmUserMiddleware, OrdersController.create);
    // routes.get('', isAdmUserMiddleware, OrdersController.read);
    // routes.get('', isAdmUserMiddleware, OrdersController.readOne);
    // routes.patch('', isAdmUserMiddleware, OrdersController.update);
    // routes.delete('', isAdmUserMiddleware, OrdersController.delete);
    exports.routes.post('', orders_controller_1.default.create);
    exports.routes.get('', orders_controller_1.default.read);
    exports.routes.get('/:id', orders_controller_1.default.readOne);
    exports.routes.patch('/:id', orders_controller_1.default.update);
    exports.routes.delete('/:id', orders_controller_1.default.delete);
    return exports.routes;
};
exports.orderRoutes = orderRoutes;
