import { Router } from "express";
import AdressController from "../controller/adress.controller";

const routes = Router();

export const adressRoutes = () => {
  routes.post("/adress", AdressController.create);

  routes.get("/adress/:id", AdressController.read);

  routes.patch("/adress/:id", AdressController.update);

  routes.delete("/adress/:id", AdressController.delete);
};
