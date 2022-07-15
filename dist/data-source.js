"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
require("reflect-metadata");
exports.AppDataSource = process.env.NODE_ENV === 'test'
    ? new typeorm_1.DataSource({
        type: 'sqlite',
        database: ':memory:',
        entities: ['src/entities/*.ts'],
        synchronize: true,
    })
    : new typeorm_1.DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
        synchronize: false,
        logging: false,
        entities: process.env.NODE_ENV === 'production'
            ? ['dist/src/entities/*.js']
            : ['src/entities/*.ts'],
        migrations: process.env.NODE_ENV === 'production'
            ? ['dist/src/migrations/*.js']
            : ['src/migrations/*.ts'],
    });
