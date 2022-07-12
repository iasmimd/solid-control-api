import { AppDataSource } from '../data-source';
import { Ticket } from '../entities/ticket.entity';

class TicketService {
  static async create(user_id: string) {
    const ticketRepository = AppDataSource.getRepository(User);

    const findUser = await ticketRepository.findOne({
      where: { user_id },
    });

    if (!findUser) {
      throw new Error('User not found');
    }

    const ticket = new Ticket();
    ticket.cart;

    ticketRepository.create(ticket);
    ticketRepository.save(ticket);

    return ticket;
  }
}

export default TicketService;
