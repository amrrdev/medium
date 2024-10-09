import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { join } from 'node:path';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'medium',
  database: 'medium',
  password: 'amr',
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
};

export default config;
