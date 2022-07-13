import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import { ICart } from "../interfaces/cart";
import { fixedFloat } from "../utils";

export class CartService {
  static async addCartService({ product_id, userEmail }: ICart) {
    const cartRepository = AppDataSource.getRepository(Cart);
    // const productRepository = AppDataSource.getRepository(Product);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { email: userEmail } });

    if (!user) {
      throw new AppError( 404,"User  not found");
    }

    // const cart = cartRepository.findOne({ where: { id: user?.cart.id } });

    // if (!cart) {
    //   throw new Error("User cart not found", 404);
    // }
    // const product = productRepository.findOne({ where: { id: product_id } });

    // if (!product) {
    //   throw new Error("Product not found", 404);
    // }

    // if (cart && product) {
    //   if (
    //     cart.product.filter((prod) => prod.name === product.name).length > 0
    //   ) {
    //     throw new AppError(409, "Product is already in the cart");
    //   }

    //   cart.products = [...cart.products, product];
    //   cart.subtotal = fixedFloat(cart.subtotal + product.price * product.qtd);
    //   await cartRepository.save(cart);

    //   return cart;
  }
  static async DeleteCartItem({ product_id, userEmail }: ICart) {
    const cartRepository = AppDataSource.getRepository(Cart);
    //     const userRepository = AppDataSource.getRepository(User)

    //     const user = await userRepository.findOne({
    //     where: {
    //         email: userEmail
    //     }
    // })

    // const cart = await cartRepository.findOne({
    //     where: {
    //         id: user?.cart.id
    //     }
    // })

    // if (cart) {

    //     if (cart.products.filter(prod => prod.id === product_id).length === 0) {
    //         throw new Error(404, "Product is not in the cart")
    //     }

    //     cart.products = cart.products.filter(prod => prod.id !== product_id)
    //     cart.subtotal = fixedFloat(cart.products.reduce((acc, prod) => acc + prod.price, 0))

    //     await cartRepository.save(cart)

    //     return
    //  }
  }
}
