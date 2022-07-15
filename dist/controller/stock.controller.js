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
const stock_service_1 = __importDefault(require("../service/stock.service"));
class StockController {
}
_a = StockController;
StockController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStock = yield stock_service_1.default.create(req.body);
        return res.status(201).json(newStock);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: error.name,
                message: error.message,
            });
        }
    }
});
StockController.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stock = yield stock_service_1.default.list();
        return res.status(200).json(stock);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: error.name,
                message: error.message,
            });
        }
    }
});
StockController.readOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const stock = yield stock_service_1.default.readOne(id);
        return res.status(200).json(stock);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: error.name,
                message: error.message,
            });
        }
    }
});
StockController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedStock = yield stock_service_1.default.update(id, req.body);
        return res.status(200).json({ message: 'Stock updated' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: error.name,
                message: error.message,
            });
        }
    }
});
StockController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const stock = yield stock_service_1.default.delete(id);
        return res.status(200).json({ message: 'Stock deleted with success' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: error.name,
                message: error.message,
            });
        }
    }
});
exports.default = StockController;
