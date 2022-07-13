import { Router } from 'express';
import AddressController from '../controller/address.controller';

const routes = Router();

export const addressRoutes = () => {
  routes.post('', AddressController.create);
  routes.get('/:id', AddressController.readOne);
  routes.patch('/:id', AddressController.update);
  routes.delete('/:id', AddressController.delete);

  return routes;
};
