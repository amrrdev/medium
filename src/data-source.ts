import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'medium',
  database: 'medium',
  password: 'amr',
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  synchronize: false,
  migrations: [join(__dirname, './migration/**/*{.ts,.js}')],
  logging: true,
};
export const AppDataSource = new DataSource(dataSourceOption);
