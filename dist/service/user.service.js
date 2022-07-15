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
const AppError_1 = require("../errors/AppError");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class UsersServices {
    static createUserService({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const users = yield usersRepository.find();
            const emailExists = users.find((el) => el.email === email);
            if (emailExists) {
                throw new AppError_1.AppError(409, "E-mail already exists!");
            }
            const user = usersRepository.create({
                name,
                email,
                password: bcrypt_1.default.hashSync(password, 10),
                active: true
            });
            yield usersRepository.save(user);
            return user;
        });
    }
    static loginUserService({ email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const user = yield usersRepository.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw new AppError_1.AppError(403, "Invalid credentials");
            }
            if (!user.active) {
                throw new Error("Inactive user");
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
    static retrieveUserService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const users = yield usersRepository.find();
            const userFound = users.find((el) => el.id === id);
            if (!userFound) {
                throw new AppError_1.AppError(404, "User not found");
            }
            return userFound;
        });
    }
    static updateUserService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = data_source_1.AppDataSource.getTreeRepository(user_entity_1.User);
            const users = yield usersRepository.find();
            const userFound = users.find((el) => el.id === id);
            if (!userFound) {
                throw new AppError_1.AppError(404, "User not found");
            }
            const user = yield usersRepository.update(userFound.id, data);
            if (user.affected === 1) {
                const userUpdated = yield usersRepository.findOneBy({ id: id });
                return userUpdated;
            }
        });
    }
    static deleteUserService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const userFound = yield usersRepository.findOneBy({ id: id });
            if (!userFound) {
                throw new AppError_1.AppError(404, "User not found");
            }
            //await usersRepository.delete(userFound!.id);
            if (!userFound.active) {
                throw new Error("Inactivated user");
            }
            userFound.active = false;
            yield usersRepository.save(userFound);
        });
    }
    static listUsersService() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const users = yield usersRepository.find();
            return users;
        });
    }
}
exports.default = UsersServices;
