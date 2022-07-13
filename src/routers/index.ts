import { Express } from 'express';
import { productRouter } from './product.routes';
import { ticketRoutes } from './tickets.routes';
import { providerRoutes } from './provider.routes';
import { userRoutes } from './users.routes';
import { addressRoutes } from './address.routes';

export const appRoutes = (app: Express) => {
  app.use('', userRoutes())
  app.use('/address', addressRoutes())
  app.use('/tickets', ticketRoutes());
  app.use('/products', productRouter());
  app.use('/provider', providerRoutes());
};

export default appRoutes;
