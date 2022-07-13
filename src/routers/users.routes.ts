import { Router } from "express";
import UsersControllers from "../controller/user.controller";

const routes = Router();

export const userRoutes = () => {
    routes.post("/register", UsersControllers.createUserController);
    routes.post("/login", UsersControllers.loginUserController);
    routes.get("/users/:id", UsersControllers.retrieveUserController);
    routes.patch("/users/:id", UsersControllers.updateUserController);
    routes.delete("/users/:id", UsersControllers.deleteUserController);
};