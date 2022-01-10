import { join } from 'path';
import { EnvService } from 'src/common/env.service';
import { ConnectionOptions } from 'typeorm';

const config = new EnvService().read();

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: ['warn', 'error'],
  migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
export = connectionOptions;
