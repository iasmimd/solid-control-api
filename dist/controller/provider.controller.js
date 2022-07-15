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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const provider_service_1 = __importDefault(require("../service/provider.service"));
class ProviderController {
}
_a = ProviderController;
ProviderController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProvider = yield provider_service_1.default.create(req.body);
    return res.status(201).json(newProvider);
});
ProviderController.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providers = yield provider_service_1.default.list();
    return res.status(200).json(providers);
});
ProviderController.readOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const provider = yield provider_service_1.default.readOne(id);
    return res.status(200).json(provider);
});
ProviderController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedProvider = yield provider_service_1.default.update(id, req.body);
    return res.status(200).json({ message: 'Provider updated' });
});
ProviderController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const provider = yield provider_service_1.default.delete(id);
    return res.status(200).json({ message: 'Provider deleted with success' });
});
exports.default = ProviderController;
