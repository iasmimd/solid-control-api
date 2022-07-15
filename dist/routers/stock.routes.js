"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRoutes = void 0;
const express_1 = require("express");
const stock_controller_1 = __importDefault(require("../controller/stock.controller"));
const routes = (0, express_1.Router)();
const stockRoutes = () => {
    routes.post('', stock_controller_1.default.create);
    routes.get('', stock_controller_1.default.list);
    routes.get('/:id', stock_controller_1.default.readOne);
    routes.patch('/:id', stock_controller_1.default.update);
    routes.delete('/:id', stock_controller_1.default.delete);
    return routes;
};
exports.stockRoutes = stockRoutes;
