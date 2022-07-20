import { Router } from "express";
import UsersControllers from "../controller/user.controller";
import { userCreateSchema, validateUserCreateMiddleware } from "../middleware/validateUserCreate.middleware";
import { userLoginSchema, validateUserLoginMiddleware } from "../middleware/validateUserLogin.middleware";
import { authUser } from "../middleware/authToken.middleware";
import isAdmUserMiddleware from "../middleware/isAdmin.middleware";

const routes = Router();

export const userRoutes = () => {

  routes.post("/register", validateUserCreateMiddleware(userCreateSchema), UsersControllers.create);
  routes.post("/login", validateUserLoginMiddleware(userLoginSchema), UsersControllers.login);
  routes.get("/me", authUser, UsersControllers.retrieve);
  routes.patch("", authUser, UsersControllers.update);
  routes.delete("", authUser, UsersControllers.delete);

  routes.get("", isAdmUserMiddleware, UsersControllers.list);

  return routes
};