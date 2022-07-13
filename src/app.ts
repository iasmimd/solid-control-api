import express from 'express';
import { appRoutes } from './routers';
import errorMiddleware from './middleware/error.middleware';

const app = express();

app.use(express.json());

appRoutes(app);

app.use(errorMiddleware);

export default app;
