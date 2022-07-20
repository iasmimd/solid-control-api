import { DataSource } from "typeorm";
import app from "../app";
import { AppDataSource } from "../data-source";
import { IProduct } from "../interfaces/product";
import { IProviderCreate } from "../interfaces/provider";
import { ISupply } from "../interfaces/supply";
import { IAdminUser, IUserCreate, IUserLogin } from "../interfaces/user";
import request from "supertest";

let testUser: IUserCreate = {
  name: "gabriel",
  email: "gabriel@teste.com",
  street: "São Lara",
  number: "1020",
  complement: "casa",
  state: "SP",
  city: "BR",
  zip_code: "13245788",
  password: "12345",
};

let loginUser: IUserLogin = {
  email: "gabriel@teste.com",
  password: "12345",
};

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

let testProduct: IProduct = {
  supplies: [],
  name: "produto Teste",
  price: 1,
  img: "https://i.pinimg.com/564x/4a/77/57/4a77579ebb19a13c89e750ebf5bf7efe.jpg",
};

let testAdmin: IAdminUser = {
  name: "gabriel",
  email: "gabriel@teste.com",
  password: "12345",
  isAdm: true,
};

let loginAdmin: IUserLogin = {
  email: "gabriel@teste.com",
  password: "12345",
};

describe("Teste nos métodos POST E GET  em /tickets ", () => {
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

  it("Teste de de um ticket", async () => {
    const register = await request(app).post("/users/register").send(testUser);
    const login = await request(app).post("/users/login").send(loginUser);
    const token = login.body.token;

    const registerAdm = await request(app)
      .post("/admin/register")
      .send(testAdmin);
    const loginAdm = await request(app).post("/admin/login").send(loginAdmin);
    const tokeAdmin = loginAdm.body.token;

    const createProvider = await request(app)
      .post("/providers")
      .set("Authorization", `Bearer ${tokeAdmin}`)
      .send(testeProvider);
    testSupply.provider_id = createProvider.body.id;
    const createSupply = await request(app)
      .post("/supply")
      .set("Authorization", `Bearer ${tokeAdmin}`)
      .send(testSupply);
    testProduct.supplies = [{ id: createSupply.body.id, qtd: 1 }];
    const createProduct = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${tokeAdmin}`)
      .send(testProduct);
      console.log(createProduct.body)
    const createCartUser = await request(app)
      .post(`/cart/${createProduct.body.id}`)
      .set("Authorization", `Bearer ${token}`);
    
    const response = await request(app)
      .post("/ticket")
      .set("Authorization", `Bearer ${token}`);
   
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("products");
    expect(response.body).toHaveProperty("total");
    expect(response.body.id.length).toBe(36);
  
  });

  it("Teste de listagem para o cart do usuário", async () => {
    const login = await request(app).post("/users/login").send(loginUser);
    const token = login.body.token;

    const response = await request(app)
      .get("/ticket")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("products");
    expect(response.body[0]).toHaveProperty("total");
    expect(response.body[0].id.length).toBe(36);
    expect(Array.isArray(response.body)).toEqual(true)
  
  });
});
