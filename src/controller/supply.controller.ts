import { Request, Response } from "express";
import { SupplyService } from "../service/supply.service";

class SupplyController {
  static async create(req: Request, res: Response) {
    const data = req.body;
    const response = await SupplyService.create(data);

    return res.status(201).json(response);
  }

  static list = async (req: Request, res: Response) => {
    const response = await SupplyService.list();

    return res.status(200).json(response);
  };

  static readOne = async (req: Request, res: Response) => {
    const { supply_id } = req.params;

    const response = await SupplyService.readOne(supply_id);

    return res.status(200).json(response);
  };

  static update = async (req: Request, res: Response) => {
   
      const {supply_id } = req.params;
      const data = req.body;
      const response = await SupplyService.update(supply_id, data );

      return res.status(200).json({ message: "Stock updated" })
    
  };

  static delete = async (req: Request, res: Response) => {
  
      const { id } = req.params;

      const response = await SupplyService.delete(id);

      return res.status(200).json({ message: "Stock deleted with success" });
  
    
  };
}
export default SupplyController