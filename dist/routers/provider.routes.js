"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerRoutes = void 0;
const express_1 = require("express");
const provider_controller_1 = __importDefault(require("../controller/provider.controller"));
const routes = (0, express_1.Router)();
const providerRoutes = () => {
    routes.post('', provider_controller_1.default.create);
    routes.get('', provider_controller_1.default.list);
    routes.get('/:id', provider_controller_1.default.readOne);
    routes.patch('/:id', provider_controller_1.default.update);
    routes.delete('/:id', provider_controller_1.default.delete);
    return routes;
};
exports.providerRoutes = providerRoutes;
