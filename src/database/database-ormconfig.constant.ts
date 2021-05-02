import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Parties } from '../parties/parties.entity';
import { PartiesUsers } from '../parties-users/parties-users.entity';
import { Party } from '../party/party.entity';
import { User } from '../users/user.entity';

export const getOrmConfig = (): TypeOrmModuleOptions => {
  const settings = {
    host: 'postgres',
    port: parseInt(process.env.POSTGRES_DEV_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  };
  const entities = [User, Party, Parties, PartiesUsers];

  if (process.env.NODE_ENV !== 'test') {
    return {
      type: 'postgres',
      host: settings.host,
      port: settings.port,
      username: settings.username,
      password: settings.password,
      database: settings.database,
      logging: false,
      entities,
      synchronize: true,
    };
  }
  return {
    type: 'sqlite',
    database: './db/test-db.sql',
    entities,
    synchronize: true,
    dropSchema: true,
  };
};
