import { Express } from 'express';
import { adminRoutes } from './admin.routes';
import { orderRoutes } from './orders.routes';
import { productRouter } from './product.routes';
import { ticketRoutes } from './tickets.routes';
import { providerRoutes } from './provider.routes';
import { userRoutes } from './users.routes';

import { cartRoutes } from './cart.routes';
import { stockRoutes } from './stock.routes';
import { supplyRoutes } from './supply.routes';
import { paymentRoute } from './payment.routes';

export const appRoutes = (app: Express) => {
  app.use('/admin', adminRoutes());
  app.use('/users', userRoutes());

  app.use('/ticket', ticketRoutes());
  app.use('/products', productRouter());
  app.use('/providers', providerRoutes());
  app.use('/cart', cartRoutes());
  app.use('/stock', stockRoutes());
  app.use('/supply', supplyRoutes());
  app.use('/orders', orderRoutes());
  app.use('/payment', paymentRoute());
};

export default appRoutes;
