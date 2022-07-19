import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { ISupply } from '../interfaces/supply';
import { IProviderCreate } from '../interfaces/provider';
import { IAdminUser, IUserLogin } from '../interfaces/user';
import app from '../app';
import request from 'supertest';

let testSupply: ISupply = {
  name: 'ovo',
  buy_price: 10,
  provider_id: '',
};

let provider: IProviderCreate = {
  fantasy_name: 'Mc Donalds',
  name: 'Mc Donalds',
  cnpj: '132499471',
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

let testAdmin: IAdminUser = {
  name: 'gabriel',
  email: 'gabriel@teste.com',
  password: '12345',
  isAdm: true,
};

let testLoginAdmin = {
  email: 'gabriel@teste.com',
  password: '12345',
};

describe('Teste para o método POST em /supply', () => {
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

  it('Testando criação de supply', async () => {
    const registerAdmin = await request(app)
      .post('/admin/register')
      .send(testAdmin);

    const loginAdmin = await request(app)
      .post('/admin/login')
      .send(testLoginAdmin);
    const { token } = loginAdmin.body;

    const providerTeste = await request(app)
      .post('/providers')
      .set('Authorization', `Bearer ${token}`)
      .send(provider);
    testSupply.provider_id = providerTeste.body.id;


    const response = await request(app)
      .post('/supply')
      .set('Authorization', `Bearer ${token}`)
      .send(testSupply);

    expect(response.status).toEqual(201);
    expect(response.body.id.length).toEqual(36);
  });
});
