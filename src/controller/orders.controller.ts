import { Request, Response } from "express";
import OrdersService from "../service/orders.service";

class OrdersController {
  static async create(req: Request, res: Response) {
    const { supplies, provider_id, status } = req.body;

    const order = await OrdersService.createNewOrder({
      provider_id,
      supplies,
      status,
    });

    return res.status(201).json(order);
  }

  static async read(req: Request, res: Response) {
    const readAllOrders = await OrdersService.list();

    return res.status(200).json(readAllOrders);
  }

  static async readOne(req: Request, res: Response) {
    const { id } = req.params;

    const readOrder = await OrdersService.readOne(id);

    return res.status(200).json(readOrder);
  }

  static async update(req: Request, res: Response) {
    const { status } = req.body;
    const { id } = req.params;

    await OrdersService.updateOrder(id, status);

    return res.status(204).json({ message: "Order updated with success" });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await OrdersService.deleteOrder(id);

    return res.status(204).json({ message: "Order deleted with success" });
  }
}

export default OrdersController;
