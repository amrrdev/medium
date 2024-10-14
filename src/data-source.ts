import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, './../.env') });

const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  synchronize: false,
  migrations: [join(__dirname, '**/migrations/*{.ts,.js}')],
  logging: true,
};

export const AppDataSource = new DataSource(dataSourceOption);
