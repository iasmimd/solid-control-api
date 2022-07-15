"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("../controller/payment.controller"));
const authToken_middleware_1 = require("../middleware/authToken.middleware");
const router = (0, express_1.Router)();
const paymentRoute = () => {
    router.get('/checkout/:id/:email/:description/:amount', authToken_middleware_1.authToken, payment_controller_1.default.create);
    router.get('/success', (req, res) => {
        return res.render('success_screen');
    });
    router.get('/pending', (req, res) => {
        return res.render('pending_screen');
    });
    router.get('/failure', (req, res) => {
        return res.render('failure_screen');
    });
    return router;
};
exports.paymentRoute = paymentRoute;
