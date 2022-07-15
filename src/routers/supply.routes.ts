import { Router } from 'express';
import SupplyController from '../controller/supply.controller';

const routes = Router();

export const supplyRoutes = () => {
  routes.post('', SupplyController.create);
  routes.get('', SupplyController.list);
  routes.get('/:supply_id', SupplyController.readOne);
  routes.patch('/:supply_id', SupplyController.update);
  routes.delete('/:supply_id', SupplyController.delete);

  return routes
};