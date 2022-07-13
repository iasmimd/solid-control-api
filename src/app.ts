import express from "express";
import { handleError } from "./errors/AppError";
import { appRoutes } from "./routers";
import providerRoutes from "./routers/provider.routes";

const app = express();

app.use(express.json());

app.use(appRoutes);

app.use(providerRoutes);

export default app;
