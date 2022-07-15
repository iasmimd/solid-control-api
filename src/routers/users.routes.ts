import { Router } from "express";
import UsersControllers from "../controller/user.controller";
import { userCreateSchema, validateUserCreateMiddleware } from "../middleware/validateUserCreate.middleware";
import { userLoginSchema, validateUserLoginMiddleware } from "../middleware/validateUserLogin.middleware";
import { authToken } from "../middleware/authToken.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("/register", validateUserCreateMiddleware(userCreateSchema), UsersControllers.create);
  routes.post("/login", validateUserLoginMiddleware(userLoginSchema), UsersControllers.login);
  routes.get("/:id", authToken, UsersControllers.retrieve);
  routes.patch("/:id", authToken, UsersControllers.update);
  routes.delete("/:id", authToken, UsersControllers.delete);
  routes.get("", authToken, UsersControllers.list);

  return routes
};
