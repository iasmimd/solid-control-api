import { Router } from 'express';
import ProviderController from '../controller/provider.controller';

const routes = Router();

export const providerRoutes = () => {
  routes.post('', ProviderController.create);
  routes.get('', ProviderController.list);
  routes.get('/:id', ProviderController.readOne);
  routes.patch('/:id', ProviderController.update);
  routes.delete('/:id', ProviderController.delete);

  return routes
};
