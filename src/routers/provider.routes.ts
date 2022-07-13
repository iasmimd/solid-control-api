import { Router } from 'express';
import ProviderController from '../controller/provider.controller';

const routes = Router();

export const providerRoutes = () => {
  routes.post('/providers', ProviderController.create);
  routes.get('/providers', ProviderController.list);
  routes.get('/providers/:id', ProviderController.readOne);
  routes.patch('/providers/:id', ProviderController.update);
  routes.delete('/providers/:id', ProviderController.delete);

  return routes
};
