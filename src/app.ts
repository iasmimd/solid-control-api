import express from 'express';
import { appRoutes } from './routers';
import cors from 'cors';
import * as path from 'path';
import errorMiddleware from './middleware/error.middleware';

const engines = require('consolidate');

const app = express();

app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('../../client'));
app.engine('ejs', engines.ejs);
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

appRoutes(app);

app.use(errorMiddleware);

export default app;
