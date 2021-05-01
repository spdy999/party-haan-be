import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
// import { User } from './users/user.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'postgres',
    //   port: 5432,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE_NAME,
    //   synchronize: true,
    //   entities: [User],
    //   // logging: 'all',
    //   // migrations: ['migrations/**/*.js'],
    //   // subscribers: ['subscriber/**/*.js'],
    // }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
