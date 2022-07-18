import { Router } from 'express';
import TicketController from '../controller/ticket.controller';
import { authUser } from '../middleware/authToken.middleware';

const routes = Router();

export const ticketRoutes = () => {
  routes.post('',authUser, TicketController.create)
  routes.get('', TicketController.read)
  
  return routes
};
