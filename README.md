# Solid Control ⚓

## Documentação da API

## Tabela de Conteúdos:

- [Solid Control ⚓](#solid-control-)
  - [Documentação da API](#documentação-da-api)
  - [Tabela de Conteúdos:](#tabela-de-conteúdos)
  - [1. Visão Geral](#1-visão-geral)
  - [2. Diagrama ER](#2-diagrama-er)
  - [3. Início Rápido](#3-início-rápido)
    - [3.1. Instalando Dependências](#31-instalando-dependências)
    - [3.2. Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [3.3. Migrations](#33-migrations)
  - [5. Endpoints](#5-endpoints)
    - [Índice](#índice)
  - [5.1 Users](#51-users)
  - [5.2 Cart](#52-cart)
  - [5.3 Ticket](#53-ticket)
  - [5.4 Provider](#54-provider)
  - [5.5 Supply](#55-supply)
  - [5.6 Orders](#56-orders)
  - [5.7 Stock](#57-stock)
  - [5.8 Products](#58-products)

---

## 1. Visão Geral

Tecnologias usadas:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [UUID](https://www.npmjs.com/package/uuid)
- [pg](https://www.npmjs.com/package/pg)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- [Commitizen](https://www.npmjs.com/package/commitizen)
- [Jest](https://www.npmjs.com/package/jest)
- [UUID-validate](https://www.npmjs.com/package/uuid-validate)

A URL base da aplicação:
https://solid-control-api.herokuapp.com/

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](./src/image/diagrama_solid-control.png)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#5.0-Users)

  - [POST - /users/register](#)
  - [POST - /users/login](#)
  - [GET - /users](#)
  - [GET - /users/:user_id](#)
  - [PATCH - /users/](#)
  - [DELETE - /users/](#)

- [Cart](#)

  - [POST - /cart](#)
  - [GET - /cart](#)
  - [DELETE - /cart](#)

- [Ticket](#)

  - [POST - /ticket](#)
  - [GET - /ticket](#)

- [Providers](#)

  - [POST - /providers](#)
  - [GET - /providers](#)
  - [GET - /providers/:provider_id](#)
  - [PATCH - /providers/:provider_id](#)
  - [DELETE - /providers/:provider_id](#)

- [Supply](#)

  - [POST - /supply](#)
  - [GET - /supply](#)
  - [GET - /supply/:supply_id](#)
  - [PATCH - /supply/:supply_id](#)
  - [DELETE - /supply/:supply_id](#)

- [Orders](#)

  - [POST - /orders](#)
  - [GET - /orders](#)
  - [GET - /orders/:order_id](#)
  - [PATCH - /orders/:order_id](#)
  - [DELETE - /orders/:order_id](#)

- [Stock](#)
  - [POST - /stock](#)
  - [GET - /stock](#)
  - [GET - /stock/:stock_id](#)
  - [PATCH - /stock/:stock_id](#)
  - [DELETE - /stock/:stock_id](#)

---

## 5.1 Users

Users é a tabela responsavel por armazenar os dados de todos os usuarios.

| Name       | Description                       | Type    |
| ---------- | --------------------------------- | ------- |
| name       | Nome                              | string  |
| email      | Email de cadastro                 | string  |
| street     | Rua / Avenida / Travessa ou Viela | string  |
| number     | Numero                            | nuimber |
| complement | Complemento                       | String  |
| state      | Estado                            | string  |
| city       | cidade                            | string  |
| zip_code   | Codigo postal                     | string  |
| id         | Identificador uuid                | string  |

<br>

<span style="background:orange; color: black; font-weight: bold; padding: 2px 5px;">POST</span> **/users/register**

Para criarmos um novo usuario.

Corpo da requisição.

```JSON
{
	"name": "Rafhael Mallorga",
	"email": "rafhaelmallorga@email.com",
	"street": "Rua rua",
	"number": 123,
	"complement": "casa",
	"state": "SP",
	"city": "Sao Paulo",
	"zip_code": "12345678",
	"password": "123456"
}
```

Resposta da requisição.

**_Obs: O carrinho é criado automaticamente na criação do usuario._**

```JSON
{
	"name": "Rafhael",
	"email": "rafhael@teste.com",
	"number": 1020,
	"street": "São Lara",
	"complement": "casa",
	"state": "SP",
	"zip_code": "13245788",
	"city": "Itapira",
	"cart": {
		"id": "761e3d3a-ee9e-4b60-9eab-a8b108e88b9a",
		"subtotal": 0
	},
	"id": "c6a96b4c-beaf-4304-aaa0-2f9c016eb213",
	"isAdm": false,
	"active": true,
	"created_at": "2022-07-20T15:39:16.568Z",
	"updated_at": "2022-07-20T15:39:16.568Z"
}
```

<span style="background:orange; color: black; font-weight: bold; padding: 2px 5px;">POST</span> **/users/login**

Corpo da requisição para realiarmos o login.

```JSON
{
	"email": "rafhaelmallorga@email.com",
	"password": "123456"
}
```

Resposta do login.

```JSON
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2YTk2YjRjLWJlYWYtNDMwNC1hYWEwLTJmOWMwMTZlYjIxMyIsImVtYWlsIjoicmFmaGFlbEB0ZXN0ZS5jb20iLCJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjU4MzIwOTA4LCJleHAiOjE2NTgzNjQxMDh9.6siaAt0VyoOwvkXR2k5-A4Ux_9jx3YPyHQUdHFh2MG4"
}
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/users**

Lista todos os usuarios cadastrados.

```JSON
[
	{
		"id": "c6a96b4c-beaf-4304-aaa0-2f9c016eb213",
		"name": "Rafhael",
		"email": "rafhael@teste.com",
		"isAdm": true,
		"active": true,
		"number": "1020",
		"street": "São Lara",
		"complement": "casa",
		"created_at": "2022-07-20T15:39:16.568Z",
		"updated_at": "2022-07-20T15:41:28.474Z",
		"state": "SP",
		"zip_code": "13245788",
		"city": "Itapira",
		"cart": {
			"id": "761e3d3a-ee9e-4b60-9eab-a8b108e88b9a",
			"subtotal": 0,
			"products": []
		}
	}
]
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/users/:user_id**

Lê um usuario específico informando o seu id na url.

```JSON
{
	"id": "c6a96b4c-beaf-4304-aaa0-2f9c016eb213",
	"name": "Rafhael",
	"email": "rafhael@teste.com",
	"isAdm": true,
	"active": true,
	"number": "1020",
	"street": "São Lara",
	"complement": "casa",
	"created_at": "2022-07-20T15:39:16.568Z",
	"updated_at": "2022-07-20T15:41:28.474Z",
	"state": "SP",
	"zip_code": "13245788",
	"city": "Itapira",
	"cart": {
		"id": "761e3d3a-ee9e-4b60-9eab-a8b108e88b9a",
		"subtotal": 0,
		"products": []
	}
}
```

<span style="background:yellow; color: black; font-weight: bold; padding: 2px 5px;">PATCH</span> **/users**

Permite atualizar os dados cadastrais do usuario. Não é necessário passar o id do usuario que será atualizado, pois isto é feito através do token.

Exemplo de corpo da requisicao.

```JSON
{
	"name": "Joao dos Santos"
}
```

<span style="background:red; color: black; font-weight: bold; padding: 2px 5px;">DELETE</span> **/providers/:provider_id**

Permite deletar o usuario. Não é necessário passar o id do usuario que será deletado, pois isto é feito através do token.

## 5.2 Cart

Cart é a tabela responsavel por armazenar os dados de todos os produtos no carrinho do usuario. Nao é necessario passar nada do corpo da requisição, bastando apenas enviar o id do produto na URL.

<br>

<span style="background:orange; color: black; font-weight: bold; padding: 2px 5px;">POST</span> **/cart/:product_id**

Resposta da requisição.

```JSON
{
	"id": "761e3d3a-ee9e-4b60-9eab-a8b108e88b9a",
	"subtotal": 3,
	"products": [
		{
			"id": "c3b47c1d-f48e-4f3d-be83-957f024ae86b",
			"name": "Coca Cola 3 Litros",
			"price": "3.00",
			"img": "https://apoioentrega.vteximg.com.br/arquivos/ids/452238/88434.jpg?v=637105354224830000",
			"supplies": [
				{
					"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
					"name": "Coca-Cola 3l",
					"buy_price": "2.50",
					"qtd": null,
					"provider": [
						{
							"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
							"fantasy_name": "Coca Cola",
							"name": "Coca Cola Inc",
							"cnpj": "12345678901234",
							"ie": "123456789",
							"street": "Rua do Bairro",
							"number": 234,
							"complement": "Industria",
							"district": "Bairro da Cidade",
							"city": "Cidade do Estado",
							"state": "SP",
							"country": "Brasil",
							"zip_code": "02758-090"
						}
					]
				}
			]
		}
	]
}
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/cart**

Lista todos os produtos no carrinho do usuario atraves do token.

```JSON
{
	"id": "761e3d3a-ee9e-4b60-9eab-a8b108e88b9a",
	"subtotal": 3,
	"products": [
		{
			"id": "c3b47c1d-f48e-4f3d-be83-957f024ae86b",
			"name": "Coca Cola 3 Litros",
			"price": "3.00",
			"img": "https://apoioentrega.vteximg.com.br/arquivos/ids/452238/88434.jpg?v=637105354224830000",
			"supplies": [
				{
					"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
					"name": "Coca-Cola 3l",
					"buy_price": "2.50",
					"qtd": null,
					"provider": [
						{
							"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
							"fantasy_name": "Coca Cola",
							"name": "Coca Cola Inc",
							"cnpj": "12345678901234",
							"ie": "123456789",
							"street": "Rua do Bairro",
							"number": 234,
							"complement": "Industria",
							"district": "Bairro da Cidade",
							"city": "Cidade do Estado",
							"state": "SP",
							"country": "Brasil",
							"zip_code": "02758-090"
						}
					]
				}
			]
		}
	]
}
```

<span style="background:red; color: black; font-weight: bold; padding: 2px 5px;">DELETE</span> **/cart/:product_id**

Para remover um item do carrinho basta enviar o ID do produto na URL.

<br>

## 5.3 Ticket

Ticket é a tabela responsavel por gerar o pedido do usuario com os itens cadastrados anteriormente no carrinho.

<br>

<span style="background:orange; color: black; font-weight: bold; padding: 2px 5px;">POST</span> **/ticket**

Para criarmos um novo ticket basta realizar o post com o token do usuario que a API é a responsavel por localizar o carrinho e gerar o novo ticket.

Resposta da requisição.

```JSON
{
	"user": {
		"id": "c6a96b4c-beaf-4304-aaa0-2f9c016eb213",
		"name": "Rafhael dos Santos Mallorga",
		"email": "rafhael@teste.com",
		"password": "$2b$10$064vXthA.Ls1Y6K93X/10uvobpVP00MiRqlXTsZfDs7yIltyomdkm",
		"isAdm": true,
		"active": true,
		"number": "1020",
		"street": "São Lara",
		"complement": "casa",
		"created_at": "2022-07-20T15:39:16.568Z",
		"updated_at": "2022-07-20T20:12:21.171Z",
		"state": "SP",
		"zip_code": "13245788",
		"city": "Itapira",
		"cart": {
			"id": "761e3d3a-ee9e-4b60-9eab-a8b108e88b9a",
			"subtotal": 3,
			"products": [
				{
					"id": "c3b47c1d-f48e-4f3d-be83-957f024ae86b",
					"name": "Coca Cola 3 Litros",
					"price": "3.00",
					"img": "https://apoioentrega.vteximg.com.br/arquivos/ids/452238/88434.jpg?v=637105354224830000",
					"supplies": [
						{
							"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
							"name": "Coca-Cola 3l",
							"buy_price": "2.50",
							"qtd": null,
							"provider": [
								{
									"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
									"fantasy_name": "Coca Cola",
									"name": "Coca Cola Inc",
									"cnpj": "12345678901234",
									"ie": "123456789",
									"street": "Rua do Bairro",
									"number": 234,
									"complement": "Industria",
									"district": "Bairro da Cidade",
									"city": "Cidade do Estado",
									"state": "SP",
									"country": "Brasil",
									"zip_code": "02758-090"
								}
							]
						}
					]
				}
			]
		}
	},
	"products": [
		{
			"id": "c3b47c1d-f48e-4f3d-be83-957f024ae86b",
			"name": "Coca Cola 3 Litros",
			"price": "3.00",
			"img": "https://apoioentrega.vteximg.com.br/arquivos/ids/452238/88434.jpg?v=637105354224830000",
			"supplies": [
				{
					"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
					"name": "Coca-Cola 3l",
					"buy_price": "2.50",
					"qtd": null,
					"provider": [
						{
							"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
							"fantasy_name": "Coca Cola",
							"name": "Coca Cola Inc",
							"cnpj": "12345678901234",
							"ie": "123456789",
							"street": "Rua do Bairro",
							"number": 234,
							"complement": "Industria",
							"district": "Bairro da Cidade",
							"city": "Cidade do Estado",
							"state": "SP",
							"country": "Brasil",
							"zip_code": "02758-090"
						}
					]
				}
			]
		}
	],
	"total": 3,
	"id": "4ea799b1-ea09-43f7-9f60-20857435622f"
}
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/ticket**

Lista todos os pedidos cadastrados do usuario.

```JSON
[
	{
		"id": "4ea799b1-ea09-43f7-9f60-20857435622f",
		"total": 3,
		"products": [
			{
				"id": "c3b47c1d-f48e-4f3d-be83-957f024ae86b",
				"name": "Coca Cola 3 Litros",
				"price": "3.00",
				"img": "https://apoioentrega.vteximg.com.br/arquivos/ids/452238/88434.jpg?v=637105354224830000",
				"supplies": [
					{
						"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
						"name": "Coca-Cola 3l",
						"buy_price": "2.50",
						"qtd": null,
						"provider": [
							{
								"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
								"fantasy_name": "Coca Cola",
								"name": "Coca Cola Inc",
								"cnpj": "12345678901234",
								"ie": "123456789",
								"street": "Rua do Bairro",
								"number": 234,
								"complement": "Industria",
								"district": "Bairro da Cidade",
								"city": "Cidade do Estado",
								"state": "SP",
								"country": "Brasil",
								"zip_code": "02758-090"
							}
						]
					}
				]
			}
		]
	}
]
```

---

## 5.4 Provider

Todas as rotas do workflow do produto são acessadas apenas por administradores.

Provider é a tabela responsável por armazenar nossos fornecedores, o fornecedor é o primeiro cadastro obrigatório para o workflow do produto em nossa API, sem ele não será possível o relacionamento do Supply.

| Name         | Description                          | Type    |
| ------------ | ------------------------------------ | ------- |
| fantasy_name | Nome fantasia                        | string  |
| name         | Nome                                 | string  |
| cnpj         | Cadastro Nacional de Pessoa Juridica | string  |
| ie           | Inscricao estadual                   | string  |
| street       | Rua / Avenida / Travessa ou Viela    | string  |
| number       | Numero                               | nuimber |
| complement   | Complemento                          | String  |
| district     | Bairro / Distrito                    | string  |
| city         | cidade                               | string  |
| state        | Estado                               | string  |
| country      | Pais                                 | string  |
| zip_code     | Codigo postal                        | string  |
| id           | Identificador uuid                   | string  |

<br>

<span style="background:orange; color: black; font-weight: bold; padding: 2px 5px;">POST</span> **/providers**

Corpo da requisição, sendo o “complement” opcional.

```JSON
{
	"fantasy_name": "Coca Cola",
	"name": "Coca Cola Inc",
	"cnpj": "12345678901234",
	"ie": "123456789",
	"street": "Rua do Bairro",
	"number": 234,
	"complement":"Industria",
	"district": "Bairro da Cidade",
	"city": "Cidade do Estado",
	"state": "SP",
	"country":"Brasil",
	"zip_code": "02758-090"
}
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/providers**

Lista todos os fornecedores cadastrados.

```JSON
[
  {
    "id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
    "fantasy_name": "Coca Cola",
    "name": "Coca Cola Inc",
    "cnpj": "12345678901234",
    "ie": "123456789",
    "street": "Rua do Bairro",
    "number": 234,
    "complement": "Industria",
    "district": "Bairro da Cidade",
    "city": "Cidade do Estado",
    "state": "SP",
    "country": "Brasil",
    "zip_code": "02758-090"
  }
]
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/providers/:provider_id**

Lê um fornecedor específico informando o seu id na url.

```JSON

  {
    "id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
    "fantasy_name": "Coca Cola",
    "name": "Coca Cola Inc",
    "cnpj": "12345678901234",
    "ie": "123456789",
    "street": "Rua do Bairro",
    "number": 234,
    "complement": "Industria",
    "district": "Bairro da Cidade",
    "city": "Cidade do Estado",
    "state": "SP",
    "country": "Brasil",
    "zip_code": "02758-090"[
	{
		"id": "2df65ff8-171e-4c62-ac3f-37930bf24c81",
		"total_price": "400.00",
		"status": "Finalizado",
		"supplies": [
			{
				"id": "e00d84f8-73ee-4c5f-bcde-cd328d224722",
				"name": "Coca-Cola 2l",
				"buy_price": "1.50",
				"qtd": null,
				"provider": [
					{
						"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
						"fantasy_name": "Coca Cola",
						"name": "Coca Cola Inc",
						"cnpj": "12345678901234",
						"ie": "123456789",
						"street": "Rua do Bairro",
						"number": 234,
						"complement": "Industria",
						"district": "Bairro da Cidade",
						"city": "Cidade do Estado",
						"state": "SP",
						"country": "Brasil",
						"zip_code": "02758-090"
					}
				]
			},
			{
				"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
				"name": "Coca-Cola 3l",
				"buy_price": "2.50",
				"qtd": null,
				"provider": [
					{
						"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
						"fantasy_name": "Coca Cola",
						"name": "Coca Cola Inc",
						"cnpj": "12345678901234",
						"ie": "123456789",
						"street": "Rua do Bairro",
						"number": 234,
						"complement": "Industria",
						"district": "Bairro da Cidade",
						"city": "Cidade do Estado",
						"state": "SP",
						"country": "Brasil",
						"zip_code": "02758-090"
					}
				]
			}
		],
		"provider": {
			"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
			"fantasy_name": "Coca Cola",
			"name": "Coca Cola Inc",
			"cnpj": "12345678901234",
			"ie": "123456789",
			"street": "Rua do Bairro",
			"number": 234,
			"complement": "Industria",
			"district": "Bairro da Cidade",
			"city": "Cidade do Estado",
			"state": "SP",
			"country": "Brasil",
			"zip_code": "02758-090"
		}
	}
]
```

<span style="background:yellow; color: black; font-weight: bold; padding: 2px 5px;">PATCH</span> **/providers/:provider_id**

Permite atualizar os dados cadastrais do fornecedor.
Exemplo de corpo da requisicao.

```JSON

  {

    "name": "Coca Cola Inc"

  }

```

<span style="background:red; color: black; font-weight: bold; padding: 2px 5px;">DELETE</span> **/providers/:provider_id**

Permite deletar um fornecedor do nosso banco de dados passando seu id na url.provider

## 5.5 Supply

A tabela Supply é responsável por armazenar todos os nossos suprimentos / ingredientes. Ela possui uma relação com os fornecedores que possuem estes materiais para compra.

| Name      | Description                               | Type   |
| --------- | ----------------------------------------- | ------ |
| name      | Nome do suprimento / ingrediente          | string |
| buy_price | Preço de compra                           | number |
| provider  | Array das empresas que fornecem este item | array  |
| id        | Identificador uuid                        | string |

<br>

<span style="background:orange; color: black; font-weight: bold; padding: 2px 5px;">POST</span> **/supply**

Corpo da requisição para a criação do suprimento / ingrediente.

```JSON
{
	"name": "Coca-Cola 3l",
	"buy_price": 2.5,
	"provider_id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f"
}
```

Resposta da requisição.

```JSON
{
	"name": "Coca-Cola 3l",
	"buy_price": 2.5,
	"provider": [
		{
			"id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
			"fantasy_name": "Coca-Cola",
			"name": "Coca Cola Inc",
			"cnpj": "12345678901234",
			"ie": "123456789",
			"street": "Rua do Bairro",
			"number": 234,
			"complement": "Industria",
			"district": "Bairro da Cidade",
			"city": "Cidade do Estado",
			"state": "SP",
			"country": "Brasil",
			"zip_code": "02758-090"
		}
	],
	"id": "2aca79a2-0d68-4890-9228-24c17fa4fea7"
}
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/supply**

Lista todos os ingredientes / suprimentos cadastrados em nosso banco de dados.

Corpo da resposta:

```JSON
[
	{
		"id": "d7fc0b05-05e0-471f-a675-acb51df99bc2",
		"name": "Coca-Cola 2l",
		"buy_price": "1.50",
		"provider": [
			{
				"id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
				"fantasy_name": "Coca-Cola",
				"name": "Coca Cola Inc",
				"cnpj": "12345678901234",
				"ie": "123456789",
				"street": "Rua do Bairro",
				"number": 234,
				"complement": "Industria",
				"district": "Bairro da Cidade",
				"city": "Cidade do Estado",
				"state": "SP",
				"country": "Brasil",
				"zip_code": "02758-090"
			}
		]
	},
	{
		"id": "2aca79a2-0d68-4890-9228-24c17fa4fea7",
		"name": "Coca-Cola 3l",
		"buy_price": "2.50",
		"provider": [
			{
				"id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
				"fantasy_name": "Coca-Cola",
				"name": "Coca Cola Inc",
				"cnpj": "12345678901234",
				"ie": "123456789",
				"street": "Rua do Bairro",
				"number": 234,
				"complement": "Industria",
				"district": "Bairro da Cidade",
				"city": "Cidade do Estado",
				"state": "SP",
				"country": "Brasil",
				"zip_code": "02758-090"
			}
		]
	}
]
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/supply/:supply_id**

Lê um ingrediente / suprimento específico informando o seu id na url.

```JSON
{
	"id": "d7fc0b05-05e0-471f-a675-acb51df99bc2",
	"name": "Coca-Cola 350ml",
	"buy_price": "1.50",
	"provider": [
		{
			"id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
			"fantasy_name": "Coca-Cola",
			"name": "Coca Cola Inc",
			"cnpj": "12345678901234",
			"ie": "123456789",
			"street": "Rua do Bairro",
			"number": 234,
			"complement": "Industria",
			"district": "Bairro da Cidade",
			"city": "Cidade do Estado",
			"state": "SP",
			"country": "Brasil",
			"zip_code": "02758-090"
		}
	]
}


```

<span style="background:yellow; color: black; font-weight: bold; padding: 2px 5px;">PATCH</span> **/supply/:supply_id**

Permite atualizar os dados cadastrais do suprimento / ingrediente.
Corpo da requisicao.

```JSON
{
	"name": "Coca-Cola 2l"
}
```

<span style="background:red; color: black; font-weight: bold; padding: 2px 5px;">DELETE</span> **/supply/:supply_id**

Permite deletar um suprimento / ingrediente do nosso banco de dados passando o id na url.

<br>

## 5.6 Orders

A tabela Orders é a responsável por armazenar todos os nossos pedidos de compra de ingredientes ou suprimentos junto aos nossos fornecedores.

| Name         | Description                                                | Type             |
| ------------ | ---------------------------------------------------------- | ---------------- |
| supplies [ ] | Lista de itens da O.C.: {"id":"id do supply", "qtd": 100 } | Array de objetos |
| provider_id  | Id do fornecedor referente a O.C.                          | string           |
| status       | Andamento da ordem de compra.                              | string           |

<br>

<span style="background:orange; color: black; font-weight: bold; padding: 2px 5px;">POST</span> **/orders**

Corpo da requisicao.

**_Obs.: Caso algum dos suprimentos / ingredientes ja exista em nosso estoque e o status da ordem for igual a "Finalizado" a quantidade total será atualizada._**

```JSON
{
	"supplies": [
		{"id": "d7fc0b05-05e0-471f-a675-acb51df99bc2", "qtd": 100},
		{"id": "2aca79a2-0d68-4890-9228-24c17fa4fea7", "qtd": 100}
	],
	"provider_id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
	"status": "Finalizado"
}
```

Resposta da requisição.

```JSON
{
	"total_price": "400.00",
	"status": "Finalizado",
	"supplies": [
		{
			"id": "d7fc0b05-05e0-471f-a675-acb51df99bc2",
			"name": "Coca-Cola 2l",
			"buy_price": "1.50",
			"qtd": 100,
			"provider": [
				{
					"id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
					"fantasy_name": "Coca-Cola",
					"name": "Coca Cola Inc",
					"cnpj": "12345678901234",
					"ie": "123456789",
					"street": "Rua do Bairro",
					"number": 234,
					"complement": "Industria",
					"district": "Bairro da Cidade",
					"city": "Cidade do Estado",
					"state": "SP",
					"country": "Brasil",
					"zip_code": "02758-090"
				}
			]
		},
		{
			"id": "2aca79a2-0d68-4890-9228-24c17fa4fea7",
			"name": "Coca-Cola 3l",
			"buy_price": "2.50",
			"qtd": 100,
			"provider": [
				{
					"id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
					"fantasy_name": "Coca-Cola",
					"name": "Coca Cola Inc",
					"cnpj": "12345678901234",
					"ie": "123456789",
					"street": "Rua do Bairro",
					"number": 234,
					"complement": "Industria",
					"district": "Bairro da Cidade",
					"city": "Cidade do Estado",
					"state": "SP",
					"country": "Brasil",
					"zip_code": "02758-090"
				}
			]
		}
	],
	"provider": {
		"id": "2a6a154c-a4c3-4248-bc6c-5d98e742f71f",
		"fantasy_name": "Coca-Cola",
		"name": "Coca Cola Inc",
		"cnpj": "12345678901234",
		"ie": "123456789",
		"street": "Rua do Bairro",
		"number": 234,
		"complement": "Industria",
		"district": "Bairro da Cidade",
		"city": "Cidade do Estado",
		"state": "SP",
		"country": "Brasil",
		"zip_code": "02758-090"
	},
	"id": "2d7abc79-e656-41a2-b4ad-8eb088ab465f"
}
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/orders**

Lista todas as ordens de compra.

Corpo da resposta:

```JSON
[
	{
		"id": "2df65ff8-171e-4c62-ac3f-37930bf24c81",
		"total_price": "400.00",
		"status": "Finalizado",
		"supplies": [
			{
				"id": "e00d84f8-73ee-4c5f-bcde-cd328d224722",
				"name": "Coca-Cola 2l",
				"buy_price": "1.50",
				"qtd": null,
				"provider": [
					{
						"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
						"fantasy_name": "Coca Cola",
						"name": "Coca Cola Inc",
						"cnpj": "12345678901234",
						"ie": "123456789",
						"street": "Rua do Bairro",
						"number": 234,
						"complement": "Industria",
						"district": "Bairro da Cidade",
						"city": "Cidade do Estado",
						"state": "SP",
						"country": "Brasil",
						"zip_code": "02758-090"
					}
				]
			},
			{
				"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
				"name": "Coca-Cola 3l",
				"buy_price": "2.50",
				"qtd": null,
				"provider": [
					{
						"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
						"fantasy_name": "Coca Cola",
						"name": "Coca Cola Inc",
						"cnpj": "12345678901234",
						"ie": "123456789",
						"street": "Rua do Bairro",
						"number": 234,
						"complement": "Industria",
						"district": "Bairro da Cidade",
						"city": "Cidade do Estado",
						"state": "SP",
						"country": "Brasil",
						"zip_code": "02758-090"
					}
				]
			}
		],
		"provider": {
			"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
			"fantasy_name": "Coca Cola",
			"name": "Coca Cola Inc",
			"cnpj": "12345678901234",
			"ie": "123456789",
			"street": "Rua do Bairro",
			"number": 234,
			"complement": "Industria",
			"district": "Bairro da Cidade",
			"city": "Cidade do Estado",
			"state": "SP",
			"country": "Brasil",
			"zip_code": "02758-090"
		}
	}
]
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/orders/:orders_id**

Lê uma ordem específica informando o seu id na url.

```JSON
{
		"id": "2df65ff8-171e-4c62-ac3f-37930bf24c81",
		"total_price": "400.00",
		"status": "Finalizado",
		"supplies": [
			{
				"id": "e00d84f8-73ee-4c5f-bcde-cd328d224722",
				"name": "Coca-Cola 2l",
				"buy_price": "1.50",
				"qtd": null,
				"provider": [
					{
						"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
						"fantasy_name": "Coca Cola",
						"name": "Coca Cola Inc",
						"cnpj": "12345678901234",
						"ie": "123456789",
						"street": "Rua do Bairro",
						"number": 234,
						"complement": "Industria",
						"district": "Bairro da Cidade",
						"city": "Cidade do Estado",
						"state": "SP",
						"country": "Brasil",
						"zip_code": "02758-090"
					}
				]
			},
			{
				"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
				"name": "Coca-Cola 3l",
				"buy_price": "2.50",
				"qtd": null,
				"provider": [
					{
						"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
						"fantasy_name": "Coca Cola",
						"name": "Coca Cola Inc",
						"cnpj": "12345678901234",
						"ie": "123456789",
						"street": "Rua do Bairro",
						"number": 234,
						"complement": "Industria",
						"district": "Bairro da Cidade",
						"city": "Cidade do Estado",
						"state": "SP",
						"country": "Brasil",
						"zip_code": "02758-090"
					}
				]
			}
		],
		"provider": {
			"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
			"fantasy_name": "Coca Cola",
			"name": "Coca Cola Inc",
			"cnpj": "12345678901234",
			"ie": "123456789",
			"street": "Rua do Bairro",
			"number": 234,
			"complement": "Industria",
			"district": "Bairro da Cidade",
			"city": "Cidade do Estado",
			"state": "SP",
			"country": "Brasil",
			"zip_code": "02758-090"
		}
	}
```

<span style="background:yellow; color: black; font-weight: bold; padding: 2px 5px;">PATCH</span> **/orders/:orders_id**

Permite atualizar os dados da ordem de compra.
Corpo da requisicao.

```JSON
{
	"status": "Finalizado"
}
```

<span style="background:red; color: black; font-weight: bold; padding: 2px 5px;">DELETE</span> **/orders/:orders_id**

Permite deletar uma ordem de compra do nosso banco de dados passando o id na url.

## 5.7 Stock

A tabela Orders é a responsável por armazenar todos os nossos pedidos de compra de ingredientes ou suprimentos junto aos nossos fornecedores.

| Name      | Description  | Type   |
| --------- | ------------ | ------ |
| supply_id | ID do supply | string |
| qtd       | Quantidade   | number |

<br>

<span style="background:orange; color: black; font-weight: bold; padding: 2px 5px;">POST</span> **/stock**

Corpo da requisicao.

**_Obs.: Caso algum dos suprimentos / ingredientes ja exista em nosso estoque e o status da ordem for igual a "Finalizado" a quantidade total será atualizada._**

```JSON
{
	"supply_id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
	"qtd": 200
}
```

Resposta da requisição.

```JSON
{
	"id": "26538565-be80-40fa-a10f-7daa9fd8edd5",
	"qtd": 200,
	"supply": {
		"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
		"name": "Coca-Cola 3l",
		"buy_price": "2.50",
		"qtd": null,
		"provider": [
			{
				"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
				"fantasy_name": "Coca Cola",
				"name": "Coca Cola Inc",
				"cnpj": "12345678901234",
				"ie": "123456789",
				"street": "Rua do Bairro",
				"number": 234,
				"complement": "Industria",
				"district": "Bairro da Cidade",
				"city": "Cidade do Estado",
				"state": "SP",
				"country": "Brasil",
				"zip_code": "02758-090"
			}
		]
	}
}
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/stock**

Lista todos os itens cadastrados em estoque.

Corpo da resposta:

```JSON
[
	{
		"id": "946b9b1b-4efe-46bf-ad9a-6d0acf8bbe23",
		"qtd": 100,
		"supply": {
			"id": "e00d84f8-73ee-4c5f-bcde-cd328d224722",
			"name": "Coca-Cola 2l",
			"buy_price": "1.50",
			"qtd": null,
			"provider": [
				{
					"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
					"fantasy_name": "Coca Cola",
					"name": "Coca Cola Inc",
					"cnpj": "12345678901234",
					"ie": "123456789",
					"street": "Rua do Bairro",
					"number": 234,
					"complement": "Industria",
					"district": "Bairro da Cidade",
					"city": "Cidade do Estado",
					"state": "SP",
					"country": "Brasil",
					"zip_code": "02758-090"
				}
			]
		}
	},
	{
		"id": "517d9c16-8b7b-46dc-9c81-ec6b005d9ee3",
		"qtd": 100,
		"supply": {
			"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
			"name": "Coca-Cola 3l",
			"buy_price": "2.50",
			"qtd": null,
			"provider": [
				{
					"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
					"fantasy_name": "Coca Cola",
					"name": "Coca Cola Inc",
					"cnpj": "12345678901234",
					"ie": "123456789",
					"street": "Rua do Bairro",
					"number": 234,
					"complement": "Industria",
					"district": "Bairro da Cidade",
					"city": "Cidade do Estado",
					"state": "SP",
					"country": "Brasil",
					"zip_code": "02758-090"
				}
			]
		}
	}
]
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/stock/:stock_id**

Lê um item do estoque informando o seu id na url.

```JSON
{
	"id": "517d9c16-8b7b-46dc-9c81-ec6b005d9ee3",
	"qtd": 100,
	"supply": {
		"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
		"name": "Coca-Cola 3l",
		"buy_price": "2.50",
		"qtd": null,
		"provider": [
			{
				"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
				"fantasy_name": "Coca Cola",
				"name": "Coca Cola Inc",
				"cnpj": "12345678901234",
				"ie": "123456789",
				"street": "Rua do Bairro",
				"number": 234,
				"complement": "Industria",
				"district": "Bairro da Cidade",
				"city": "Cidade do Estado",
				"state": "SP",
				"country": "Brasil",
				"zip_code": "02758-090"
			}
		]
	}
}
```

<span style="background:yellow; color: black; font-weight: bold; padding: 2px 5px;">PATCH</span> **/stock/:stock_id**

Permite atualizar os dados do item em estoque.
Corpo da requisicao.

```JSON
{
	"qtd": 200
}
```

<span style="background:red; color: black; font-weight: bold; padding: 2px 5px;">DELETE</span> **/stock/:stock_id**

Permite deletar um item do estoque do nosso banco de dados passando o id na url.

## 5.8 Products

Products é a tabela responsavel por armazenar os dados de todos os produtos criados com a relação de supply.

| Name     | Description                                        | Type   |
| -------- | -------------------------------------------------- | ------ |
| supplies | Array de objetos: {"id": "Id do supply", "qtd": 1} | Array  |
| name     | Nome do produto                                    | string |
| price    | Preço de venda                                     | number |
| img      | URL da imagem                                      | string |

<br>

<span style="background:orange; color: black; font-weight: bold; padding: 2px 5px;">POST</span> **/products**

Para criarmos um novo peoduto.

Corpo da requisição.

```JSON
{
	"supplies":  [
		{"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb", "qtd": 1}
	],
	"name": "Coca Cola 3 Litros",
	"price": 3,
	"img": "https://apoioentrega.vteximg.com.br/arquivos/ids/452238/88434.jpg?v=637105354224830000"
}
```

Resposta da requisição.

```JSON
{
	"supplies": [
		{
			"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
			"name": "Coca-Cola 3l",
			"buy_price": "2.50",
			"qtd": 1,
			"provider": [
				{
					"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
					"fantasy_name": "Coca Cola",
					"name": "Coca Cola Inc",
					"cnpj": "12345678901234",
					"ie": "123456789",
					"street": "Rua do Bairro",
					"number": 234,
					"complement": "Industria",
					"district": "Bairro da Cidade",
					"city": "Cidade do Estado",
					"state": "SP",
					"country": "Brasil",
					"zip_code": "02758-090"
				}
			]
		}
	],
	"img": "https://apoioentrega.vteximg.com.br/arquivos/ids/452238/88434.jpg?v=637105354224830000",
	"name": "Coca Cola 3 Litros",
	"price": 3,
	"id": "c3b47c1d-f48e-4f3d-be83-957f024ae86b"
}
```

<span style="background:blue; color: black; font-weight: bold; padding: 2px 5px;">GET</span> **/products**

Lista todos os produtos cadastrados.

```JSON
[
	{
		"id": "c3b47c1d-f48e-4f3d-be83-957f024ae86b",
		"name": "Coca Cola 3 Litros",
		"price": "3.00",
		"img": "https://apoioentrega.vteximg.com.br/arquivos/ids/452238/88434.jpg?v=637105354224830000",
		"supplies": [
			{
				"id": "9e516248-54a9-4c65-b75f-46b6e6e8f3cb",
				"name": "Coca-Cola 3l",
				"buy_price": "2.50",
				"provider": [
					{
						"id": "2c18c9c3-f98a-435c-8a41-8a1479193869",
						"fantasy_name": "Coca Cola",
						"name": "Coca Cola Inc",
						"cnpj": "12345678901234",
						"ie": "123456789",
						"street": "Rua do Bairro",
						"number": 234,
						"complement": "Industria",
						"district": "Bairro da Cidade",
						"city": "Cidade do Estado",
						"state": "SP",
						"country": "Brasil",
						"zip_code": "02758-090"
					}
				]
			}
		]
	}
]
```
