import { AppDataSource } from "../data-source";
import { Orders } from "../entities/orders.entity";
import { AppError } from "../errors/AppError";
import { IOrder, IOrderUpdate } from "../interfaces/orders";

class OrdersService {

  static async createNewOrder ({ total_price, status, supplies }: IOrder): Promise<Orders> {

    const ordersRepository = AppDataSource.getRepository(Orders);

    const newOrder = ordersRepository.create({
      total_price,
      status,
      supplies
    })

    if (newOrder === null) {
      throw new AppError(400, "Requisition body is incomplete or empty ");
    }

    await ordersRepository.save(newOrder);

    return newOrder;
  }

  static async readAllOrders () {
    
    const ordersRepository = AppDataSource.getRepository(Orders);

    const orders = await ordersRepository.find();

    if (!orders) {
      throw new AppError(404, 'Orders not found');
    }

    return orders;
  }

  static async readOneOrder (id: string) {
    
    const ordersRepository = AppDataSource.getRepository(Orders);

    const order = await ordersRepository.findOneBy({ id });

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    return order;
  }

  static async updateOrder (id: string, data: IOrderUpdate ) {
    
    const ordersRepository = AppDataSource.getRepository(Orders);

    const order = await ordersRepository.findOneBy({ id });

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    await ordersRepository.update(order!.id, {
      status: data.status,
    })

    return true;
  }

  static async deleteOrder (id: string) {
    
    const ordersRepository = AppDataSource.getRepository(Orders);

    const order = await ordersRepository.findOneBy({ id });

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    await ordersRepository.delete(order!.id);

    return true;
  }
}

export default OrdersService;