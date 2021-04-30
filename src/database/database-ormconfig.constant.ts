import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

export const getOrmConfig = (): TypeOrmModuleOptions => {
  const settings = {
    host: 'postgres',
    port: parseInt(process.env.POSTGRES_DEV_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  };

  if (process.env.NODE_ENV !== 'test') {
    return {
      type: 'postgres',
      host: settings.host,
      port: settings.port,
      username: settings.username,
      password: settings.password,
      database: settings.database,
      logging: false,
      entities: [User],
      synchronize: true,
    };
  }
  return {
    type: 'postgres',
    host: settings.host,
    port: settings.port,
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    dropSchema: true,
  };
};
