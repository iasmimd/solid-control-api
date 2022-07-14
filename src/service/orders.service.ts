import { AppDataSource } from "../data-source";
import { Orders } from "../entities/orders.entity";
import { Providers } from "../entities/providers.entity";
import { Supply } from "../entities/supply.entity";
import { AppError } from "../errors/AppError";
import { IOrder, IOrderUpdate } from "../interfaces/orders";

class OrdersService {

  static async createNewOrder ({ supply_id, provider_id, total_price, status }: IOrder) {

    const ordersRepository = AppDataSource.getRepository(Orders);
    const supplyRepository = AppDataSource.getRepository(Supply);
    const providerRepository = AppDataSource.getRepository(Providers);

    if (!supply_id || !provider_id || !total_price || !status) {
      throw new AppError(400, "Requisition body is incomplete or empty ");
    }

    const provider = await providerRepository.findOne({ 
      where: {
        id: provider_id,
      } 
    });

    const supply = await supplyRepository.findOneBy({ id: supply_id });

    if (provider && supply) {

      const order = new Orders()
      order.total_price = total_price
      order.status = status;
      order.supplies = [supply]
      order.provider = provider
  
      const newOrder = ordersRepository.create(order);

      await ordersRepository.save(newOrder);

  
      return newOrder;
    }
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