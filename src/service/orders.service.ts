import { AppDataSource } from "../data-source";
import { Orders } from "../entities/orders.entity";
import { Providers } from "../entities/providers.entity";
import { Supply } from "../entities/supply.entity";
import { AppError } from "../errors/AppError";
import { IOrder } from "../interfaces/orders";
import { fixedFloat } from "../utils";
import StockService from "./stock.service";

class OrdersService {
  static async createNewOrder({ supplies, provider_id }: IOrder) {
    const ordersRepository = AppDataSource.getRepository(Orders);
    const supplyRepository = AppDataSource.getRepository(Supply);
    const providerRepository = AppDataSource.getRepository(Providers);

    if (!supplies || !provider_id ) {
      throw new AppError(400, "Requisition body is incomplete or empty ");
    }
    const listSupplies: any = [];

    let allSupplies = supplies.map(async (elem) => {
      const supply = await supplyRepository.findOne({
        where: { id: elem.id },
      });
      if (supply) {
        supply.qtd = elem.qtd;
        listSupplies.push(supply);
      }
    });

    await Promise.all(allSupplies);

    const total_price = listSupplies.reduce(
      (acc: number, supply: any) => acc + supply.qtd * supply.buy_price,
      0
    );

    const provider = await providerRepository.findOne({
      where: {
        id: provider_id,
      },
    });

    if (provider) {
      const order = new Orders();
      order.total_price = fixedFloat(total_price);
      order.status = 'Finalizado';
      order.provider = provider;
      order.supplies = listSupplies;
      const newOrder = ordersRepository.create(order);
      await ordersRepository.save(newOrder);

      if (order.status === "Finalizado") {
        listSupplies?.forEach((supply: any) =>
          StockService.create(false, { qtd: supply.qtd, supply_id: supply.id })
        );
      }

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
    const order = await orderRepository.findOne({ where: { id: order_id } });
    if (!order_id) {
      throw new AppError(400, "Error in your request.");
    }

    if (!order) {
      throw new AppError(404, "Order not found.");
    }

    return order;
  }

  static async updateOrder(id: string, status: string) {
    const ordersRepository = AppDataSource.getRepository(Orders);

    const order = await ordersRepository.findOneBy({ id });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    await ordersRepository.update(id, {
      status: status,
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
