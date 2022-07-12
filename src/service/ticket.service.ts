import { userInfo } from 'os';
import { AppDataSource } from '../data-source';

class TicketService {
  static async create(user_id: string) {
    const ticketRepository = AppDataSource.getRepository(User);

    const findUser = await ticketRepository.findOne({
      where: { user_id },
    });
  }
}

export default TicketService;
