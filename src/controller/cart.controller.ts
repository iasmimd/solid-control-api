import { Request, Response } from 'express';
import { CartService } from '../service/cart.service';

export class CartController {
  static async create(req: Request, res: Response) {
    const { product_id } = req.params;

    const id = req.user.id;

    const cart = await CartService.addCartService({ product_id, id });

    return res.status(201).json(cart);
  }
  static async read(req: Request, res: Response) {
    const user_id = req.user.id;
    const response = await CartService.list(user_id);

    return res.status(200).json(response);
  }
  static async delete(req: Request, res: Response) {
    const { product_id } = req.params;

    const id = req.user.id;

    const cart = await CartService.DeleteCartItem({ product_id, id });

    return res.status(204).json(cart);
  }
}
