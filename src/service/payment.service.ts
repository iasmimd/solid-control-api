import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

class PaymentService {
  static async createPaymentService(user_id: string, email: string) {
    const userRepository = AppDataSource.getRepository(User);
  
    const user = await userRepository.findOne({ where: { id: user_id } });
   
    if (!user) {
      throw new AppError(404, "user not found");
    }
    if(user.cart.products.length === 0){
      throw new AppError (400,"Cart is empty.")
    }
    if (!user_id || !email) {
      throw new AppError(404, "Error in your request");
    }

    const item = {
      orderId: user.id,
      title: "Pagamento de e-commerce",
      description: "Pagamento referente aos produtos comprados.",
      quantity: user.cart.products.length,
      currency_id: "BRL",
      unit_price: user.cart.subtotal,
    };

    return item;
  }
}
export default PaymentService;
