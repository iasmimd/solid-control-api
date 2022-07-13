import { Router } from 'express';
import TicketController from '../controller/ticket.controller';

const routes = Router();

export const ticketRoutes = () => {
  routes.post('/tickets', TicketController.create);
  routes.get('/tickets', TicketController.read);
};
