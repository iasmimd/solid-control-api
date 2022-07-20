import { Request, Response } from "express";
import TicketService from "../service/ticket.service";

class TicketController {
  static async create(req: Request, res: Response) {
    const user_id = req.user.id;

    const ticket = await TicketService.createTicket(user_id);

    return res.status(201).json(ticket);
  }

  static async read(req: Request, res: Response) {
    const ticketList = await TicketService.readTicket();

    return res.json(ticketList);
  }

  static async update(req: Request, res: Response) {
    const { ticket_id } = req.params;
    const status = req.body;

    const ticketUpdate = await TicketService.updateStatus(ticket_id, status);

    return res.status(204).json({ message: "Status updated" });
  }
}

export default TicketController;
