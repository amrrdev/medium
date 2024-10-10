import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  synchronize: false,
  migrations: [join(__dirname, './migrations/**/*{.ts,.js}')],
  logging: true,
};
export const AppDataSource = new DataSource(dataSourceOption);
