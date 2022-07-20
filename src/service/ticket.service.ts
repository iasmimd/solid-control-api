import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";
import { Ticket } from "../entities/ticket.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import StockService from "./stock.service";

class TicketService {
  static async createTicket(user_id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const cartRepository = AppDataSource.getRepository(Cart);
    const ticketRepository = AppDataSource.getRepository(Ticket);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    const cart = await cartRepository.findOne({ where: { id: user?.cart.id } });

    if (!cart) {
      throw new AppError(400, "Cart is empty.");
    }

    if (cart && user) {
      if (cart.products.length === 0) {
        throw new AppError(400, "Cart is empty");
      }

      const ticket = new Ticket();
      ticket.user = user;
      ticket.products = cart.products;
      ticket.total = cart.subtotal;
      ticket.status = "Finalizado";

      cart.products = [];
      cart.subtotal = 0;
      await cartRepository.save(cart);

      ticketRepository.create(ticket);
      await ticketRepository.save(ticket);

      if (ticket.status === "Finalizado") {
        ticket.products.forEach((product) => {
          product.supplies.forEach((supply) => {
            StockService.create(true, { qtd: 1, supply_id: supply.id });
          });
        });
      }

      return ticket;
    }
  }

  static async readTicket() {
    const ticketRepository = AppDataSource.getRepository(Ticket);

    const ticketList = await ticketRepository.find();

    return ticketList;
  }
}

export default TicketService;
