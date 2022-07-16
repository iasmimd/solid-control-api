import { AppDataSource } from "../data-source";
import { Orders } from "../entities/orders.entity";
import { Providers } from "../entities/providers.entity";
import { Supply } from "../entities/supply.entity";
import { AppError } from "../errors/AppError";
import { IOrder, IOrderUpdate } from "../interfaces/orders";
import { SupplyService } from "./supply.service";

class OrdersService {
  static async createNewOrder({
    supplies,
    provider_id,
    total_price,
    status,
  }: IOrder) {
    const ordersRepository = AppDataSource.getRepository(Orders);
    const supplyRepository = AppDataSource.getRepository(Supply);
    const providerRepository = AppDataSource.getRepository(Providers);

    if (!supplies || !provider_id  || !status) {
      throw new AppError(400, "Requisition body is incomplete or empty ");
    }
    const listSupplies: any = [];

    let allSupplies = supplies.map(async (elem) => {
      const supply = await supplyRepository.findOne({
        where: { id: elem.id },
      });
      if (supply) {
        supply.qtd = elem.qtd
        await SupplyService.update(elem.id,{qtd:elem.qtd})
        listSupplies.push(supply);
      }
    });

    await Promise.all(allSupplies);

    const provider = await providerRepository.findOne({
      where: {
        id: provider_id,
      },
    });
    if (provider) {
      const order = new Orders();
      order.total_price = total_price;
      order.status = status;
      order.provider = provider;
      order.supplies = listSupplies;
      const newOrder = ordersRepository.create(order);
      await ordersRepository.save(newOrder);
      return newOrder;
    }
  }
  static async list() {
    const orderRepository = AppDataSource.getRepository(Orders);
    const orderList = await orderRepository.find();

    return orderList;
  }

  static async readOne(order_id: string) {
    const orderRepository = AppDataSource.getRepository(Orders);
    const orderList = await orderRepository.find();
    if (!order_id) {
      throw new AppError(400, "Error in your request.");
    }

    const order = orderList.find((order) => order.id === order_id);

    return order;
  }
  static async updateOrder(id: string, data: IOrderUpdate) {
    const ordersRepository = AppDataSource.getRepository(Orders);

    const order = await ordersRepository.findOneBy({ id });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    await ordersRepository.update(order!.id, {
      status: data.status,
    });

    return true;
  }

  static async deleteOrder(id: string) {
    const ordersRepository = AppDataSource.getRepository(Orders);

    const order = await ordersRepository.findOneBy({ id });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    await ordersRepository.delete(order!.id);

    return true;
  }
}

export default OrdersService;
