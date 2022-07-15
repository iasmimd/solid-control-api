"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const data_source_1 = require("../data-source");
const userAdmin_entity_1 = require("../entities/userAdmin.entity");
const bcrypt_1 = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../errors/AppError");
class AdminService {
    static createUserAdmin({ name, email, password, isAdm = true }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !password) {
                throw new AppError_1.AppError(400, "Can not be empty");
            }
            const adminRepository = data_source_1.AppDataSource.getRepository(userAdmin_entity_1.AdminUser);
            // const adminEmail = await adminRepository.find({
            //   where: {
            //     email: email
            //   }
            // })
            // if (!adminEmail) {
            //   throw new AppError("User already exists")
            // }
            const newAdmin = adminRepository.create({
                name,
                email,
                password: bcrypt_1.default.hashSync(password, 10),
                isAdm: isAdm
            });
            yield adminRepository.save(newAdmin);
            return newAdmin;
        });
    }
    static loginAdminService({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminRepository = data_source_1.AppDataSource.getRepository(userAdmin_entity_1.AdminUser);
            const user = yield adminRepository.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw new AppError_1.AppError(403, "Invalid credentials");
            }
            const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new AppError_1.AppError(403, "Invalid credentials");
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                isAdm: user.isAdm,
            }, process.env.SECRET_KEY, {
                expiresIn: "12h",
            });
            return token;
        });
    }
    static readUsersService() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userAdmin_entity_1.AdminUser);
            const users = yield userRepository.find();
            return users;
        });
    }
    static readOneUserService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userAdmin_entity_1.AdminUser);
            const user = yield userRepository.findOneBy({ id });
            return user;
        });
    }
    static updateUserService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userAdmin_entity_1.AdminUser);
            const user = yield userRepository.findOneBy({ id });
            const updatedUser = yield userRepository.update(user.id, {
                name: data.name,
                email: data.email,
                password: bcrypt_1.default.hashSync(data.password, 10)
            });
            return updatedUser;
        });
    }
    static deleteUserService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const useRepository = data_source_1.AppDataSource.getRepository(userAdmin_entity_1.AdminUser);
            const user = yield useRepository.findOneBy({ id });
            const deletedUser = yield useRepository.delete(user.id);
            return deletedUser;
        });
    }
}
exports.default = AdminService;
