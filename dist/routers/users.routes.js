"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const validateUserCreate_middleware_1 = require("../middleware/validateUserCreate.middleware");
const validateUserLogin_middleware_1 = require("../middleware/validateUserLogin.middleware");
const authToken_middleware_1 = require("../middleware/authToken.middleware");
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post("/register", (0, validateUserCreate_middleware_1.validateUserCreateMiddleware)(validateUserCreate_middleware_1.userCreateSchema), user_controller_1.default.create);
    routes.post("/login", (0, validateUserLogin_middleware_1.validateUserLoginMiddleware)(validateUserLogin_middleware_1.userLoginSchema), user_controller_1.default.login);
    routes.get("/:id", authToken_middleware_1.authToken, user_controller_1.default.retrieve);
    routes.patch("/:id", authToken_middleware_1.authToken, user_controller_1.default.update);
    routes.delete("/:id", authToken_middleware_1.authToken, user_controller_1.default.delete);
    routes.get("", authToken_middleware_1.authToken, user_controller_1.default.list);
    return routes;
};
exports.userRoutes = userRoutes;
