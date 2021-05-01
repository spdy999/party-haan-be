import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { PartyModule } from './party/party.module';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, PartyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
