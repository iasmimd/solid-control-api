import { Router } from "express";
import { CartController } from "../controller/cart.controller";
import { authUser } from "../middleware/authToken.middleware";

const routes = Router();

export const cartRoutes = () => {
  routes.post("/:product_id",authUser,  CartController.create);
  routes.get("",authUser,CartController.read)
  routes.delete("/:product_id", authUser, CartController.delete);

  return routes;
};
