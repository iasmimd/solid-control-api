import { Request, Response } from "express";

class StockController {
  static create = async (req: Request, res: Response) => {
    try {
      const newStock = await StockService.create(req.body);

      return res.status(201).json(newStock);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };

  static list = async (req: Request, res: Response) => {
    try {
      const stock = await StockService.list();

      return res.status(200).json(stock);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };

  static readOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const stock = await StockService.readOne(id);

      return res.status(200).json(stock);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };

  static update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedStock = await StockService.update(id, req.body);

      return res.status(200).json({ message: "Stock updated" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const stock = await StockService.delete(id);

      return res.status(200).json({ message: "Stock deleted with success" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.name,
          message: error.message,
        });
      }
    }
  };
}

export default StockController;
