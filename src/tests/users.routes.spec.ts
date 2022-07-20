import { DataSource } from "typeorm";
import app from "../app";
import { AppDataSource } from "../data-source";
import request from "supertest";
import { IUserCreate, IUserLogin } from "../interfaces/user";

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

let loginUser:IUserLogin = {
  email: "gabriel@teste.com",
  password: "12345",
};

describe('Teste para o método POST em /users', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Teste de criação de usuário.', async () => {
    const response = await request(app).post('/users/register').send(testUser);
    expect(response.status).toEqual(201);
    expect(response.body.id.length).toEqual(36);
    expect(response.body).not.toHaveProperty('password');
  });
  it('Teste de criação de usuário com email já existente', async () => {
    const response = await request(app).post('/users/register').send(testUser);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty('message');
  });
  it('Teste de criação de usuário sem passar nenhum dado', async () => {
    const response = await request(app).post('/users/register').send();
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('error');
  });
  it('Testando login de usuário', async () => {
    const login = await request(app).post('/users/login').send(loginUser);

    expect(login.status).toEqual(200);
    expect(login.body).toHaveProperty('token');
    expect(typeof login.body.token).toBe('string');
  });
});

describe("Teste para o método GET, PATCH e DELETE em /users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    await request(app).post('/users/register').send(testUser);

    delete testUser.complement;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Tentando listar todos usuários', async () => {
    const login = await request(app).post('/users/login').send(loginUser);
    const { token } = login.body;
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty('message');
  });

  it('Tentando listar o próprio usuário usuário', async () => {
    const login = await request(app).post('/users/login').send(loginUser);
    const { token } = login.body;
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty('message');
  });

  it('Tentando deletar usuário', async () => {
    const response1 = await request(app).post('/users/register').send(testUser);
    const login = await request(app).post('/users/login').send(loginUser);
    const { token } = login.body;
    const response = await request(app)
      .delete(`/users`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });
});

