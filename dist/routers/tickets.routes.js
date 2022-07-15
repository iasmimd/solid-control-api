"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRoutes = void 0;
const express_1 = require("express");
const ticket_controller_1 = __importDefault(require("../controller/ticket.controller"));
const routes = (0, express_1.Router)();
const ticketRoutes = () => {
    routes.post('/tickets', ticket_controller_1.default.create);
    routes.get('/tickets', ticket_controller_1.default.read);
    return routes;
};
exports.ticketRoutes = ticketRoutes;
