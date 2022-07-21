import { DataSource } from 'typeorm';
import app from '../app';
import { AppDataSource } from '../data-source';
import request from 'supertest';
import { IAdminUser } from '../interfaces/user';
import { IProviderCreate } from '../interfaces/provider';

let testAdmin: IAdminUser = {
  name: 'gabriel',
  email: 'gabriel@teste.com',
  password: '12345',
  isAdm: true,
};

let loginAdmin = {
  email: 'gabriel@teste.com',
  password: '12345',
};

let testeProvider: IProviderCreate = {
  fantasy_name: 'Garni Lab',
  name: 'Garni',
  cnpj: '1324594711',
  ie: '123456789',
  street: 'Rua Dom Lara',
  number: 1020,
  complement: 'Park',
  district: 'Boqueirão',
  city: 'Santos',
  state: 'SP',
  country: 'Brasil',
  zip_code: '13245788',
};

describe('Teste para o método POST, GET, PATCH e DELETE em /providers', () => {
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

  it('Teste de criação do provider.', async () => {
    const response = await request(app).post('/admin/register').send(testAdmin);
    const login = await request(app).post('/admin/login').send(loginAdmin);

    const { token } = login.body;

    const providerTest = await request(app)
      .post('/providers')
      .set('Authorization', `Bearer ${token}`)
      .send(testeProvider);

    expect(providerTest.status).toEqual(201);
    expect(providerTest.body.id.length).toEqual(36);
    expect(providerTest.body).toHaveProperty('name');
    expect(providerTest.body).toHaveProperty('cnpj');
    expect(providerTest.body).toHaveProperty('city');
    expect(providerTest.body).toHaveProperty('complement');
    expect(providerTest.body).toHaveProperty('district');
    expect(providerTest.body).toHaveProperty('country');
  });

  it('Teste da listagem dos providers.', async () => {
    const login = await request(app).post('/admin/login').send(loginAdmin);

    const { token } = login.body;
    const providerTest = await request(app)
      .get('/providers')
      .set('Authorization', `Bearer ${token}`);
    expect(providerTest.status).toEqual(200);
    expect(Array.isArray(providerTest.body)).toBe(true);
  });

  it('Teste da listagem dos providers.', async () => {
    const login = await request(app).post('/admin/login').send(loginAdmin);

    const { token } = login.body;

    const providerTest = await request(app)
      .get('/providers')
      .set('Authorization', `Bearer ${token}`);
    expect(providerTest.status).toEqual(200);
    expect(Array.isArray(providerTest.body)).toBe(true);
  });

  it('Teste do update dos providers.', async () => {
    const login = await request(app).post('/admin/login').send(loginAdmin);

    const { token } = login.body;

    const providerList = await request(app)
      .get(`/providers`)
      .set('Authorization', `Bearer ${token}`);

    const providerTest = await request(app)
      .patch(`/providers/${providerList.body[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'teste' });

    expect(providerTest.status).toEqual(204);
  });
  it('Teste do delete dos providers.', async () => {
    const login = await request(app).post('/admin/login').send(loginAdmin);

    const { token } = login.body;

    const providerList = await request(app)
      .get(`/providers`)
      .set('Authorization', `Bearer ${token}`);

    const providerTest = await request(app)
      .delete(`/providers/${providerList.body[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'teste' });

    expect(providerTest.status).toEqual(204);
  });
});
