"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmUserMiddleware = (req, res, next) => {
    if (!req.body.isAdm) {
        return res.status(401).json({
            message: "User is not Admin"
        });
    }
    next();
};
exports.default = isAdmUserMiddleware;
