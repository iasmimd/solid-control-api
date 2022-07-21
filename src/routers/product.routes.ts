import { Router } from 'express';
import ProductController from '../controller/product.controller';
import { authUser } from '../middleware/authToken.middleware';
import isAdmUserMiddleware from '../middleware/isAdmin.middleware';

const routes = Router();

export const productRouter = () => {
  routes.post('', isAdmUserMiddleware, ProductController.create);
  routes.get('', ProductController.read);
  routes.patch('/:product_id', isAdmUserMiddleware, ProductController.update);
  routes.delete('/:product_id', isAdmUserMiddleware, ProductController.delete);

  return routes;
};
