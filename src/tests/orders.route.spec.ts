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

describe("Teste para os métodos POST, GET, UPDATE e DELETE em /orders", () => {
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

  it("Teste de criação do order.", async () => {
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
    testOrders.supplies = [{ id: createSupply.body.id, qtd: 1 }];

    const response = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(testOrders);
    console.log(response.body)
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("total_price");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("supplies");
    expect(response.body.id.length).toBe(36);
  });
  it("Teste para obter a lista de orders", async () => {
    const loginAdm = await request(app).post("/admin/login").send(loginAdmin);
    const tokenAdmin = loginAdm.body.token;

    const response = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("Teste para obter um order especifico", async () => {
    const loginAdm = await request(app).post("/admin/login").send(loginAdmin);
    const tokenAdmin = loginAdm.body.token;

    const listOrders = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const response = await request(app)
      .get(`/orders/${listOrders.body[0].id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("total_price");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("supplies");
    expect(response.body.id.length).toBe(36);
  });

  it("Teste do update de uma order", async () => {
    const loginAdm = await request(app).post("/admin/login").send(loginAdmin);
    const tokenAdmin = loginAdm.body.token;
    const listOrders = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${tokenAdmin}`);

    const response = await request(app)
      .patch(`/orders/${listOrders.body[0].id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ status: "Finalizado" });
    expect(response.status).toEqual(204);
  });

  it("Teste de deleção de uma order", async () => {
    const loginAdm = await request(app).post("/admin/login").send(loginAdmin);
    const tokenAdmin = loginAdm.body.token;
    const listOrders = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    const response = await request(app)
      .delete(`/orders/${listOrders.body[0].id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ status: "Finalizado" });
    expect(response.status).toEqual(204);
  });
});
