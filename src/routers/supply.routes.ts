import { Router } from 'express';
import SupplyController from '../controller/supply.controller';



const routes = Router();

export const supplyRoutes = () => {
  routes.post('', SupplyController.create);
  routes.get('', SupplyController.list);
  routes.get('/:id', SupplyController.readOne);
  routes.patch('/:supply_id', SupplyController.update);
  routes.delete('/:id', SupplyController.delete);

  return routes
};