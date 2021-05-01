import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { PartyModule } from './party/party.module';
import { PartiesModule } from './parties/parties.module';
import { PartiesUsersModule } from './parties-users/parties-users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    PartyModule,
    PartiesModule,
    PartiesUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
