import { Router } from 'express';
import AddressController from '../controller/address.controller';
import isAdmUserMiddleware from '../middleware/isAdmin.middleware';

const routes = Router();

export const addressRoutes = () => {
  routes.post('', isAdmUserMiddleware, AddressController.create);
  routes.get('/:id', isAdmUserMiddleware, AddressController.readOne);
  routes.patch('/:id', isAdmUserMiddleware, AddressController.update);
  routes.delete('/:id', isAdmUserMiddleware, AddressController.delete);

  return routes;
};
