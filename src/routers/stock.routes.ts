import { Router } from 'express';
import StockController from '../controller/stock.controller';
import isAdmUserMiddleware from '../middleware/isAdmin.middleware';

const routes = Router();

export const stockRoutes = () => {
  routes.post('', isAdmUserMiddleware, StockController.create);
  routes.get('', isAdmUserMiddleware, StockController.list);
  routes.get('/:id', isAdmUserMiddleware, StockController.readOne);
  routes.patch('/:id', isAdmUserMiddleware, StockController.update);
  routes.delete('/:id', isAdmUserMiddleware, StockController.delete);

  return routes;
};
