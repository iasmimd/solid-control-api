import { AppDataSource } from '../data-source';
import { Ticket } from '../entities/ticket.entity';
import { User } from '../entities/user.entity';

class TicketService {
  static async createTicket(user_id: string) {
    const ticketRepository = AppDataSource.getRepository(User);

    const findUser = await ticketRepository.findOne({
      where: { id:user_id },
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

  static async readTicket() {
    const ticketRepository = AppDataSource.getRepository(Ticket);

    const ticketList = await ticketRepository.find();

    return ticketList;
  }
}

export default TicketService;
