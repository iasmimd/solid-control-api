import { AppDataSource } from "../data-source";
import { Product } from "../entities/products.entity";
import { Supply } from "../entities/supply.entity";
import { AppError } from "../errors/AppError";
import { IProduct } from "../interfaces/product";

class ProductService {
  static async productCreateService({ supplies, name, price, img }: IProduct) {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();
    const productAvailability = products.find(
      (product) => (product.name = name)
    );

    if (!supplies || !name || !price || !img) {
      throw new AppError(400, "Error in your request");
    }
    const listSupplies: any = [];

    let allSupplies = supplies.map(async (elem: any) => {
      const supply = await supplyRepository.findOne({
        where: { id: elem.id },
      });

      if (supply) {
        supply.qtd = elem.qtd;
        listSupplies.push(supply);
      }
    });

    await Promise.all(allSupplies);
   

    // if (productAvailability) {
    //   throw new AppError(409, "product already exists");
    // }

      const newProduct = new Product()
      newProduct.supplies = listSupplies
      newProduct.img = img
      newProduct.name = name
      newProduct.price = price

      const productCreated = productRepository.create(newProduct)
      await productRepository.save(newProduct);
      return productCreated;
    

   
  }

  static async listProductsService() {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();
    if (!products) {
      throw new AppError(404, "products not found");
    }
    return products;
  }

  static async updateProductsService(
    product_id: string,
    { img, name, price, supplies }: IProduct
  ) {
    if (!supplies || !name || !price || !img) {
      throw new AppError(400, "Error in your request");
    }
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({
      where: { id: product_id },
    });

    if (!product) {
      throw new AppError(404, "products not found");
    }
    await productRepository.update(product_id, { name, supplies, price, img });

    return { message: "Product updated." };
  }

  static async deleteProductService(product_id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
      where: { id: product_id },
    });

    if (!product) {
      throw new AppError(404, "products not found");
    }
    await productRepository.delete(product!.id);
    return { message: "Product as deleted" };
  }
}

export default ProductService;
