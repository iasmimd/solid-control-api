import { AppDataSource } from '../data-source';
import { Ticket } from '../entities/ticket.entity';
import { AppError } from '../errors/AppError';

class TicketService {
  static async createTicket(user_id: string) {
    const ticketRepository = AppDataSource.getRepository(User);

    const findUser = await ticketRepository.findOne({
      where: { user_id },
    });

    if (!findUser) {
      throw new AppError(404, 'User not found');
    }

    const ticket = new Ticket();
    ticket.cart;

    ticketRepository.create(ticket);
    ticketRepository.save(ticket);

    return ticket;
  }

  static async readTicket() {
    const ticketRepository = AppDataSource.getRepository(Ticket);

    const ticketList = await ticketRepository.find();

    return ticketList;
  }
}

export default TicketService;
