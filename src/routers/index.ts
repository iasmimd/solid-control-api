import { Express } from "express";
import { productRouter } from "./product.routes";
import { ticketRoutes } from "./tickets.routes";

export const appRoutes = (app: Express) => {
  app.use("/tickets", ticketRoutes());
  app.use("/products", productRouter());
};

export default appRoutes;
