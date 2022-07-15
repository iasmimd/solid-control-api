"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRoutes = void 0;
const express_1 = require("express");
const address_controller_1 = __importDefault(require("../controller/address.controller"));
const routes = (0, express_1.Router)();
const addressRoutes = () => {
    routes.post('', address_controller_1.default.create);
    routes.get('/:id', address_controller_1.default.readOne);
    routes.patch('/:id', address_controller_1.default.update);
    routes.delete('/:id', address_controller_1.default.delete);
    return routes;
};
exports.addressRoutes = addressRoutes;
