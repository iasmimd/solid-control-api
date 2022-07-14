import { Router } from 'express';
import StockController from '../controller/stock.controller';

const routes = Router();

export const stockRoutes = () => {
  routes.post('', StockController.create);
  routes.get('', StockController.list);
  routes.get('/:id', StockController.readOne);
  routes.patch('/:id', StockController.update);
  routes.delete('/:id', StockController.delete);

  return routes
};


