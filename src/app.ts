import express from 'express';
import routes from './routers';
import { adressRoutes } from './routers/adress.routes';

const app = express();

app.use(express.json());

app.use(routes);
app.use(adressRoutes)

export default app