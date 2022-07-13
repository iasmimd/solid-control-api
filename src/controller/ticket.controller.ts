import { Request, Response } from 'express';
import { AppError, handleError } from '../errors/AppError';
import TicketService from '../service/ticket.service';

class TicketController {
  static async create(req: Request, res: Response) {
    try {
      const { user_id } = req.body;

      const ticket = await TicketService.createTicket(user_id);

      return res.status(201).json(ticket);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  static async read(req: Request, res: Response) {
    const ticketList = await TicketService.readTicket();

    return res.json(ticketList);
  }
}

export default TicketController;
