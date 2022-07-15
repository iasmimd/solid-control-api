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
const userAdmin_service_1 = __importDefault(require("../service/userAdmin.service"));
class AdminController {
    static createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, isAdm } = req.body;
            yield userAdmin_service_1.default.createUserAdmin({ name, email, password, isAdm });
            return res.status(201).json({ name, email });
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const token = yield userAdmin_service_1.default.loginAdminService({ email, password });
            return res.status(200).json({ token });
        });
    }
    static listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userAdmin_service_1.default.readUsersService();
            return res.status(200).json(users);
        });
    }
    static listOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userAdmin_service_1.default.readOneUserService(id);
            return res.status(200).json(user);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updatedUser = yield userAdmin_service_1.default.updateUserService(id, req.body);
            return res.status(200).json({ message: 'User updated' });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userAdmin_service_1.default.deleteUserService(id);
            return res.status(200).json({ message: 'User deleted with success!' });
        });
    }
}
exports.default = AdminController;
