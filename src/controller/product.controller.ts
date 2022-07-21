import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import ProductService from '../service/product.service';

class ProductController {
  static async create(req: Request, res: Response) {
    const data = req.body;

    const response = await ProductService.productCreateService(data);

    return res.status(201).json(response);
  }

  static async update(req: Request, res: Response) {
    const { product_id } = req.params;

    const data = req.body;

    const response = await ProductService.updateProductsService(
      product_id,
      data
    );

    return res.status(204).json(response);
  }

  static async read(req: Request, res: Response) {
    const response = await ProductService.listProductsService();
    return res.status(200).json(instanceToPlain(response));
  }

  static async delete(req: Request, res: Response) {
    const { product_id } = req.params;

    const response = await ProductService.deleteProductService(product_id);

    return res.status(204).json(response);
  }
}

export default ProductController;
