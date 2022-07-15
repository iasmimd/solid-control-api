"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplyRoutes = void 0;
const express_1 = require("express");
const supply_controller_1 = __importDefault(require("../controller/supply.controller"));
const routes = (0, express_1.Router)();
const supplyRoutes = () => {
    routes.post('', supply_controller_1.default.create);
    routes.get('', supply_controller_1.default.list);
    routes.get('/:supply_id', supply_controller_1.default.readOne);
    routes.patch('/:supply_id', supply_controller_1.default.update);
    routes.delete('/:supply_id', supply_controller_1.default.delete);
    return routes;
};
exports.supplyRoutes = supplyRoutes;
