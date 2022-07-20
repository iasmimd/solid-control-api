import { Request, Response } from 'express';
import StockService from '../service/stock.service';

class StockController {
  static create = async (req: Request, res: Response) => {
   
      const newStock = await StockService.create(false,{...req.body});

      return res.status(201).json(newStock);    
  };

  static list = async (req: Request, res: Response) => {
      const stock = await StockService.list();

      return res.status(200).json(stock);
  };

  static readOne = async (req: Request, res: Response) => {

      const { id } = req.params;

      const stock = await StockService.readOne(id);

      return res.status(200).json(stock);  
  };

  static update = async (req: Request, res: Response) => {
      const { id } = req.params;
      const {qtd} = req.body

      const updatedStock = await StockService.update(id, qtd);

      return res.status(200).json({ message: 'Stock updated' });
  };

  static delete = async (req: Request, res: Response) => {
      const { id } = req.params;

      const stock = await StockService.delete(id);

      return res.status(200).json({ message: 'Stock deleted' });
  };
}

export default StockController;
