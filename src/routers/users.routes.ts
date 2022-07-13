import { Router } from "express";
import UsersControllers from "../controller/user.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("/register", UsersControllers.create);
  routes.post("/login", UsersControllers.login);
  routes.get("/users/:id", UsersControllers.retrieve);
  routes.patch("/users/:id", UsersControllers.update);
  routes.delete("/users/:id", UsersControllers.delete);
  routes.get("/users", UsersControllers.list);

  return routes
};
