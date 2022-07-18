import { Router } from "express";
import PaymentController from "../controller/payment.controller";
import { authUser } from "../middleware/authToken.middleware";

const router = Router();
export const paymentRoute = () => {
  router.get("/checkout", authUser, PaymentController.create);

  router.get("/success", (req, res) => {
    return res.render("success_screen");
  });

  router.get("/pending", (req, res) => {
    return res.render("pending_screen");
  });

  router.get("/failure", (req, res) => {
    return res.render("failure_screen");
  });

  return router;
};
