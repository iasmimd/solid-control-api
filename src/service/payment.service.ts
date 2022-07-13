import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

 class PaymentService {
  static async createPaymentService(
    user_id: string,
    email: string,
    description: string,
    amount: string
  ) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError(404, "user notfound");
    }

    if (!user_id || !email || !description || !amount) {
      throw new AppError(404, "Error in your request");
    }

    const item = {
      orderId: user.id,
      title: description,
      description: `${description}`,
      quantity: 1,
      currency_id: "BRL",
      unit_price: parseFloat(amount),
    };

    return item;
  }
}
export default PaymentService