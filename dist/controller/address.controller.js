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
const address_service_1 = __importDefault(require("../service/address.service"));
class AddressController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { number, street, complement, state, zip_code, country } = req.body;
            const newAddress = yield address_service_1.default.createAddress({
                number,
                street,
                complement,
                state,
                zip_code,
                country,
            });
            return res.status(201).send(newAddress);
        });
    }
    static readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield address_service_1.default.readAddress(id);
            return res.status(201).json(user);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const address = yield address_service_1.default.updateAddress(data, id);
            return res.json(address);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const address = yield address_service_1.default.deleteAddress(id);
            return res.status(200).json({ message: 'Address deleted' });
        });
    }
}
exports.default = AddressController;
