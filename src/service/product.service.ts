import { AppDataSource } from "../data-source";
import { Product } from "../entities/products.entity";
import { Supply } from "../entities/supply.entity";
import { AppError } from "../errors/AppError";
import { IProduct } from "../interfaces/product";

class ProductService {
  static async productCreateService({
    supplies,
    name,
    price,
    description,
    img,
  }: IProduct) {
    const supplyRepository = AppDataSource.getRepository(Supply);
    const productRepository = AppDataSource.getRepository(Product);

    const productAvailability = await productRepository.findOne({
      where: { name, price, img },
    });

    if (productAvailability) {
      throw new AppError(409, "Product already exists.");
    }

    if (!supplies || !name || !price || !img || !description) {
      throw new AppError(400, "Error in your request");
    }

    const listSupplies: any = [];

    let allSupplies = supplies.map(async (elem: any) => {
      const supply = await supplyRepository.findOne({
        where: { id: elem.id },
      });

      if (!supply) {
        throw new AppError(404, "At least one supply don't exist");
      }

      if (supply) {
        supply.qtd = elem.qtd;
        listSupplies.push(supply);
      }
    });

    await Promise.all(allSupplies);

    const newProduct = new Product();
    newProduct.supplies = listSupplies;
    newProduct.price = price;
    newProduct.name = name;
    newProduct.description = description;
    newProduct.img = img;

    await productRepository.save(newProduct);
    return newProduct;
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
    { img, name, price }: IProduct
  ) {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({
      where: { id: product_id },
    });

    if (!product) {
      throw new AppError(404, "products not found");
    }
    await productRepository.update(product_id, { name, price, img });

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
