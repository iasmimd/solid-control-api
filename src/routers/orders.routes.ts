import { Router } from "express";
import OrdersController from "../controller/orders.controller";
import isAdmUserMiddleware from "../middleware/isAdmin.middleware";

export const routes = Router();

export const orderRoutes = () => {

  // routes.post('', isAdmUserMiddleware, OrdersController.create);
  // routes.get('', isAdmUserMiddleware, OrdersController.read);
  // routes.get('', isAdmUserMiddleware, OrdersController.readOne);
  // routes.patch('', isAdmUserMiddleware, OrdersController.update);
  // routes.delete('', isAdmUserMiddleware, OrdersController.delete);

  routes.post('', OrdersController.create);
  routes.get('', OrdersController.read);
  routes.get('/:id', OrdersController.readOne);
  routes.patch('/:id', OrdersController.update);
  routes.delete('/:id', OrdersController.delete);

  return routes
};