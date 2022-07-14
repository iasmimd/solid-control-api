import { Router } from 'express';
import { CartController } from '../controller/cart.controller';
import { authToken } from '../middleware/authToken.middleware';

const routes = Router();

export const cartRoutes = () => {
  routes.post('/:product_id', authToken, CartController.create);
  routes.delete('', authToken, CartController.delete);

  return routes;
};
