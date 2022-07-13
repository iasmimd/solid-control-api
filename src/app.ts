import express, { Request, Response, NextFunction } from 'express';
import { appRoutes } from "./routers";
import { AppError, handleError } from "./errors/AppError";

const app = express();

app.use(express.json());

appRoutes(app)

app.use(handleError());

export default app;
