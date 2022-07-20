import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { IProduct } from '../interfaces/product';
import { IAdminUser } from '../interfaces/user';
import { ISupply } from '../interfaces/supply';
import { IProviderCreate } from '../interfaces/provider';
import app from '../app';
import request from 'supertest';

let testProduct: IProduct = {
  supplies: [],
  name: 'macarrão',
  price: 10,
  img: 'https://i.pinimg.com/564x/4a/77/57/4a77579ebb19a13c89e750ebf5bf7efe.jpg',
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

describe('Teste para a rota /products', () => {
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

  it('Testando criação de produto', async () => {
    const registerAdmin = await request(app)
      .post('/admin/register')
      .send(testAdmin);

    const loginAdmin = await request(app)
      .post('/admin/login')
      .send(testLoginAdmin);
    const { token } = loginAdmin.body;

    const providerTest = await request(app)
      .post('/providers')
      .set('Authorization', `Bearer ${token}`)
      .send(provider);
    testSupply.provider_id = providerTest.body.id;

    const supply = await request(app)
      .post('/supply')
      .set('Authorization', `Bearer ${token}`)
      .send(testSupply);

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(testProduct);
    testProduct.supplies = [{ id: supply.body.id, qtd: 2 }];

    expect(response.status).toEqual(201);
    expect(response.body.id.length).toEqual(36);
  });
});
