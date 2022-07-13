import { Router } from "express";
import { CartController } from "../controller/cart.controller";
import { authToken } from "../middleware/authToken.middleware";

const router = Router()

export const cartRoutes = () => {
    router.post("/:product_id",authToken, CartController.create)
    router.delete("",authToken, CartController.delete)
    return router
}