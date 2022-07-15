"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const userAdmin_controller_1 = __importDefault(require("../controller/userAdmin.controller"));
const routes = (0, express_1.Router)();
const adminRoutes = () => {
    routes.post("/register", userAdmin_controller_1.default.createAdmin);
    routes.post("/login", userAdmin_controller_1.default.login);
    routes.get("", userAdmin_controller_1.default.listUsers);
    routes.get("/:id", userAdmin_controller_1.default.listOneUser);
    routes.patch("/:id", userAdmin_controller_1.default.update);
    routes.delete("/:id", userAdmin_controller_1.default.delete);
    return routes;
};
exports.adminRoutes = adminRoutes;
