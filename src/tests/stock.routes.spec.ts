import { DataSource } from "typeorm";
import app from "../app";
import { AppDataSource } from "../data-source";
import request from "supertest";
import { IAdminUser } from "../interfaces/user";
import { IProviderCreate } from "../interfaces/provider";
import { ISupply } from "../interfaces/supply";
import { IOrder } from "../interfaces/orders";

let testeProvider: IProviderCreate = {
  fantasy_name: "Garni Lab",
  name: "Garni",
  cnpj: "1324594711",
  ie: "123456789",
  street: "Rua Dom Lara",
  number: 1020,
  complement: "Park",
  district: "Boqueirão",
  city: "Santos",
  state: "SP",
  country: "Brasil",
  zip_code: "13245788",
};

let testSupply: ISupply = {
  name: "ovo",
  buy_price: 10,
  provider_id: "",
};

let testOrders: IOrder = {
  supplies: [],
  provider_id: "",
  status: "Finalizado",
};

let testAdmin: IAdminUser = {
  name: "gabriel",
  email: "gabriel@teste.com",
  password: "12345",
  isAdm: true,
};

let loginAdmin = {
  email: "gabriel@teste.com",
  password: "12345",
};

describe("Teste para os métodos POST, GET, UPDATE  em /stock", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });
  it("Teste de criação do stock.", async () => {
    const registerAdm = await request(app)
      .post("/admin/register")
      .send(testAdmin);
    const loginAdm = await request(app).post("/admin/login").send(loginAdmin);
    const tokenAdmin = loginAdm.body.token;

    const providerTest = await request(app)
      .post("/providers")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(testeProvider);

    testOrders.provider_id = providerTest.body.id;
    testSupply.provider_id = providerTest.body.id;

    const createSupply = await request(app)
      .post("/supply")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(testSupply);
    testOrders.supplies = [{ id: createSupply.body.id, qtd: 3 }];

    const response = await request(app)
      .post("/stock")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ qtd: 2, supply_id: createSupply.body.id });
    expect(response.status).toEqual(201);
    expect(response.body.id.length).toBe(36);
    expect(response.body).toHaveProperty("qtd");
    expect(response.body).toHaveProperty("supply");
  });

  it("Teste de listagem do stock.", async () => {
    const loginAdm = await request(app).post("/admin/login").send(loginAdmin);
    const tokenAdmin = loginAdm.body.token;

    const providerTest = await request(app)
      .post("/providers")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(testeProvider);

    testOrders.provider_id = providerTest.body.id;
    testSupply.provider_id = providerTest.body.id;

    const createSupply = await request(app)
      .post("/supply")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(testSupply);
    testOrders.supplies = [{ id: createSupply.body.id, qtd: 3 }];

    const createOrder = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(testOrders);

    const response = await request(app)
      .get("/stock")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
  });

  it("Teste de update do stock", async () => {
    const loginAdm = await request(app).post("/admin/login").send(loginAdmin);
    const tokenAdmin = loginAdm.body.token;

    const listStock = await request(app)
      .get("/stock")
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const response = await request(app)
      .patch(`/stock/${listStock.body[0].id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ qtd: 5 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");

    const stockUpdated = await request(app)
      .get("/stock")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(stockUpdated.body[0].qtd).toEqual(5);
  });
});
