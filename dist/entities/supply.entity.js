"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supply = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const providers_entity_1 = require("./providers.entity");
let Supply = class Supply {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Supply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 256, nullable: false }),
    __metadata("design:type", String)
], Supply.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Supply.prototype, "buy_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], Supply.prototype, "qtd", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => providers_entity_1.Providers, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Supply.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => orders_entity_1.Orders),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Supply.prototype, "orders", void 0);
Supply = __decorate([
    (0, typeorm_1.Entity)()
], Supply);
exports.Supply = Supply;
