import express from 'express';
import routes from './routers';
import { userRoutes } from './routers/users.routes';

const app = express();

app.use(express.json());

app.use(routes);


app.use(userRoutes);

export default app