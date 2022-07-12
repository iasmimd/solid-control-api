import express from "express";
import routes from "./routers";
import providerRoutes from "./routers/provider.routes";

const app = express();

app.use(express.json());

app.use(routes);
app.use(providerRoutes);

export default app;
