import { Router } from "express";
import AddressController from "../controller/address.controller";

const routes = Router();

export const addressRoutes = () => {
  routes.post("/address", AddressController.create);

  routes.get("/address/:id", AddressController.readOne);

  routes.patch("/address/:id", AddressController.update);

  routes.delete("/address/:id", AddressController.delete);
};