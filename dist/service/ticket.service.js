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
const data_source_1 = require("../data-source");
const ticket_entity_1 = require("../entities/ticket.entity");
const user_entity_1 = require("../entities/user.entity");
const AppError_1 = require("../errors/AppError");
class TicketService {
    static createTicket(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const findUser = yield userRepository.findOne({
                where: { id: user_id },
            });
            if (!findUser) {
                throw new AppError_1.AppError(404, 'User not found');
            }
            const ticketRepository = data_source_1.AppDataSource.getRepository(ticket_entity_1.Ticket);
            const ticket = new ticket_entity_1.Ticket();
            ticket.cart;
            ticketRepository.create(ticket);
            yield ticketRepository.save(ticket);
            return ticket;
        });
    }
    static readTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketRepository = data_source_1.AppDataSource.getRepository(ticket_entity_1.Ticket);
            const ticketList = yield ticketRepository.find();
            return ticketList;
        });
    }
}
exports.default = TicketService;
