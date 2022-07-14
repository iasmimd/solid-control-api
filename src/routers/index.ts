import { Express } from "express";
import { orderRoutes } from "./orders.routes";
import { productRouter } from './product.routes';
import { ticketRoutes } from './tickets.routes';
import { providerRoutes } from './provider.routes';
import { userRoutes } from './users.routes';
import { addressRoutes } from './address.routes';
import { cartRoutes } from './cart.routes';
import { stockRoutes } from './stock.routes';
import { supplyRoutes } from './supply.routes';

export const appRoutes = (app: Express) => {
  app.use('', userRoutes());
  app.use('/address', addressRoutes());
  app.use('/', ticketRoutes());
  app.use('/products', productRouter());
  app.use('/provider', providerRoutes());
  app.use('/cart', cartRoutes());
  app.use('/stock', stockRoutes());
  app.use("/supply",supplyRoutes())
  app.use("/orders", orderRoutes())

};

export default appRoutes;
