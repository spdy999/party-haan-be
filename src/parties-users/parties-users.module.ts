import { Module } from '@nestjs/common';
import { PartiesUsersService } from './parties-users.service';

@Module({
  providers: [PartiesUsersService],
})
export class PartiesUsersModule {}
