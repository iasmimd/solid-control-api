import { Router } from 'express';
import SupplyController from '../controller/supply.controller';
import isAdmUserMiddleware from '../middleware/isAdmin.middleware';

const routes = Router();

export const supplyRoutes = () => {
  routes.post('', isAdmUserMiddleware, SupplyController.create);
  routes.get('', isAdmUserMiddleware, SupplyController.list);
  routes.get('/:supply_id', isAdmUserMiddleware, SupplyController.readOne);
  routes.patch('/:supply_id', isAdmUserMiddleware, SupplyController.update);
  routes.delete('/:supply_id', isAdmUserMiddleware, SupplyController.delete);

  return routes
};