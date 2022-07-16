import { AppDataSource } from "../data-source";
import { Orders } from "../entities/orders.entity";
import { Providers } from "../entities/providers.entity";
import { Supply } from "../entities/supply.entity";
import { AppError } from "../errors/AppError";
import { IOrder, IOrderUpdate } from "../interfaces/orders";
import { IStockCreate } from "../interfaces/stock";
import StockService from "./stock.service";

class OrdersService {
  static async createNewOrder({ supplies, provider_id, status }: IOrder) {
    const ordersRepository = AppDataSource.getRepository(Orders);
    const supplyRepository = AppDataSource.getRepository(Supply);
    const providerRepository = AppDataSource.getRepository(Providers);

    if (!supplies || !provider_id || !status) {
      throw new AppError(400, "Requisition body is incomplete or empty ");
    }
    const listSupplies: any = [];

    //total_price

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
      order.total_price = total_price.toFixed(2);
      order.status = status;
      order.provider = provider;
      order.supplies = listSupplies;
      const newOrder = ordersRepository.create(order);
      await ordersRepository.save(newOrder);

      if (status === "Finalizado") {
        listSupplies?.forEach((supply: IStockCreate) =>
          StockService.create(supply)
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
    const orderList = await orderRepository.find();
    if (!order_id) {
      throw new AppError(400, "Error in your request.");
    }

    const order = orderList.find((order) => order.id === order_id);

    return order;
  }
  static async updateOrder(id: string, status: string) {
    const ordersRepository = AppDataSource.getRepository(Orders);

    const order = await ordersRepository.findOneBy({ id });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    console.log(order);

    await ordersRepository.update(id, {
      status: status,
    });

    // if (data?.status === "Finalizado") {
    //   order.supplies?.forEach((supply: IStockCreate) =>
    //     StockService.create(supply)
    //   );
    // }

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
