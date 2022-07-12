import { Router } from "express";
import ProviderController from "../controller/provider.controller";

const providerRoutes = Router();

providerRoutes.post("/providers", ProviderController.create);
providerRoutes.get("/providers", ProviderController.list);
providerRoutes.get("/providers/:id", ProviderController.readOne);
providerRoutes.patch("/providers/:id", ProviderController.update);
providerRoutes.delete("/providers/:id", ProviderController.delete);

export default providerRoutes;
