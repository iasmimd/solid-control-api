import { Router } from 'express';
import TicketController from '../controller/ticket.controller';
import { authUser } from '../middleware/authToken.middleware';

const routes = Router();

export const ticketRoutes = () => {
  routes.post('', authUser, TicketController.create);
  routes.get('', authUser, TicketController.read);
  routes.patch('/:ticket_id', authUser, TicketController.update);

  return routes;
};
