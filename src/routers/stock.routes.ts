import { Router } from "express";
import StockController from "../controller/stock.controller";

const stockRoutes = Router();

stockRoutes.post("/stock", StockController.create);
stockRoutes.get("/stock", StockController.list);
stockRoutes.get("/stock/:id", StockController.readOne);
stockRoutes.patch("/stock/:id", StockController.update);
stockRoutes.delete("/stock/:id", StockController.delete);

export default stockRoutes;
