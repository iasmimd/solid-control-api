import { Router } from 'express';
import ProviderController from '../controller/provider.controller';
import isAdmUserMiddleware from '../middleware/isAdmin.middleware';

const routes = Router();

export const providerRoutes = () => {
  routes.post('', isAdmUserMiddleware, ProviderController.create);
  routes.get('', isAdmUserMiddleware, ProviderController.list);
  routes.get('/:id', isAdmUserMiddleware, ProviderController.readOne);
  routes.patch('/:id', isAdmUserMiddleware, ProviderController.update);
  routes.delete('/:id', isAdmUserMiddleware, ProviderController.delete);

  return routes
};
