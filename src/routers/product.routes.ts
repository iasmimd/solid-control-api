import { Router } from 'express';
import ProductController from '../controller/product.controller';

const routes = Router();

export const productRouter = () => {
  routes.post('', ProductController.create);
  routes.get('', ProductController.read);
  routes.patch('/:product_id', ProductController.update);
  routes.delete('/:product_id', ProductController.delete);

  return routes;
};
