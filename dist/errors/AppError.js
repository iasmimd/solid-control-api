"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.AppError = AppError;
const handleError = (err, res) => {
    const { statusCode, message } = err;
    return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};
exports.handleError = handleError;
