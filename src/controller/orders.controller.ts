import { Request, Response } from "express";
import OrdersService from "../service/orders.service";

class OrdersController {

  static async create (req: Request, res: Response) {

    const { total_price, status, supplies } = req.body;

    const order = await OrdersService.createNewOrder({total_price, status, supplies});

    return res.status(201).json(order);
  }

  static async read (res: Response) {

    const readAllOrders = await OrdersService.readAllOrders();

    return res.status(200).json(readAllOrders);
  }

  static async readOne (req: Request, res: Response) {
    
    const { id } = req.params;

    const readOrder = await OrdersService.readOneOrder(id);

    return res.status(200).json(readOrder);
  }

  static async update (req: Request, res: Response) {
    
    const { status } = req.body;
    const { id } = req.params;

    await OrdersService.updateOrder(id, status);

    return res.status(204).json({ message: "Order updated with success" });
  }

  static async delete (req: Request, res: Response) {
    
    const { id } = req.params;

    await OrdersService.deleteOrder(id);

    return res.status(204).json({ message: "Order deleted with success" })
  }
}

export default OrdersController;