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
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const supply_service_1 = require("../service/supply.service");
class SupplyController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const response = yield supply_service_1.SupplyService.create(data);
            return res.status(201).json((0, class_transformer_1.instanceToPlain)(response));
        });
    }
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield supply_service_1.SupplyService.list();
            return res.status(200).json((0, class_transformer_1.instanceToPlain)(response));
        });
    }
    ;
    static readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { supply_id } = req.params;
            const response = yield supply_service_1.SupplyService.readOne(supply_id);
            return res.status(200).json((0, class_transformer_1.instanceToPlain)(response));
        });
    }
    ;
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { supply_id } = req.params;
            const data = req.body;
            const response = yield supply_service_1.SupplyService.update(supply_id, data);
            return res.status(204).send();
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { supply_id } = req.params;
            const response = yield supply_service_1.SupplyService.delete(supply_id);
            return res.status(204).send();
        });
    }
}
exports.default = SupplyController;
