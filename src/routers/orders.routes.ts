import { Router } from "express";
import OrdersController from "../controller/orders.controller";
import isAdmUserMiddleware from "../middleware/isAdmin.middleware";

export const routes = Router();

export const orderRoutes = () => {

  routes.post('', isAdmUserMiddleware, OrdersController.create);
  routes.get('', isAdmUserMiddleware, OrdersController.read);
  routes.get('', isAdmUserMiddleware, OrdersController.readOne);
  routes.patch('', isAdmUserMiddleware, OrdersController.update);
  routes.delete('', isAdmUserMiddleware, OrdersController.delete);

  return routes
};