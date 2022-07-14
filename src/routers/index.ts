import { Express } from "express";
import { orderRoutes } from "./orders.routes";
import { productRouter } from "./product.routes";
import { ticketRoutes } from "./tickets.routes";

export const appRoutes = (app: Express) => {
  app.use("/tickets", ticketRoutes());
  app.use("/products", productRouter());
  app.use("/orders", orderRoutes())
};

export default appRoutes;
