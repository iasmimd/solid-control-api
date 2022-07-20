import { Router } from "express";
import OrdersController from "../controller/orders.controller";
import isAdmUserMiddleware from "../middleware/isAdmin.middleware";

export const routes = Router();

export const orderRoutes = () => {

  routes.post('', isAdmUserMiddleware, OrdersController.create);
  routes.get('', isAdmUserMiddleware, OrdersController.read);
  routes.get('/:id', isAdmUserMiddleware, OrdersController.readOne);
  routes.patch('/:id', isAdmUserMiddleware, OrdersController.update);
  routes.delete('/:id', isAdmUserMiddleware, OrdersController.delete);

  return routes
};