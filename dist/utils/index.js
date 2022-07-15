"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedFloat = void 0;
const fixedFloat = (value) => {
    return Number.parseFloat((value).toFixed(2));
};
exports.fixedFloat = fixedFloat;
