"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../service/user.service"));
const class_transformer_1 = require("class-transformer");
require("express-async-errors");
class UsersControllers {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const newUser = yield user_service_1.default.createUserService({
                name,
                email,
                password,
            });
            return res.status(201).json((0, class_transformer_1.instanceToPlain)(newUser));
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const token = yield user_service_1.default.loginUserService({ email, password });
            return res.status(200).json({ token });
        });
    }
    static retrieve(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield user_service_1.default.retrieveUserService(id);
            return res.status(200).json(user);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield user_service_1.default.updateUserService(id, req.body);
            return res.status(200).json({ message: "User updated!" });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield user_service_1.default.deleteUserService(id);
            return res.status(200).send({ message: 'User deleted!' });
        });
    }
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_service_1.default.listUsersService();
            return res.status(200).json((0, class_transformer_1.instanceToPlain)(users));
        });
    }
}
exports.default = UsersControllers;
