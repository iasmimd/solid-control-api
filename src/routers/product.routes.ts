import { Router } from 'express';
import ProductController from '../controller/product.controller';

const router = Router();

export const productRouter = () => {
  router.post('', ProductController.create);
  router.get('', ProductController.read);
  router.patch('/:product_id', ProductController.update);
  router.delete('/:product_id', ProductController.delete);
  return router;
};
