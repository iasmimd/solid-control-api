import { AppDataSource } from "../data-source";
import { Orders } from "../entities/orders.entity";
import { AppError } from "../errors/AppError";
import { IOrders } from "../interfaces/orders";


class OrdersService {

  static async createNewOrder ({ total_price, status, supplies }: IOrders): Promise<Orders> {

    const orderRepository = AppDataSource.getRepository(Orders);

    const newOrder = orderRepository.create({
      total_price,
      status,
      supplies
    })

    if (newOrder === null) {
      throw new AppError(400, "Requisition body is incomplete or empty ");
    }

    await orderRepository.save(newOrder);

    return newOrder;
  }

  static async readAllOrders () {
    
    const ordersRepository = AppDataSource.getRepository(Orders);

    const orders = await ordersRepository.find();

    return orders;
  }

  static async readOneOrder (id: string) {
    
    const ordersRepository = AppDataSource.getRepository(Orders);

    const order = await ordersRepository.findOneBy({ id });

    return order;
  }

  static async updateOrder () {
    
  }

  static async deleteOrder () {
    
  }
}

export default OrdersService;