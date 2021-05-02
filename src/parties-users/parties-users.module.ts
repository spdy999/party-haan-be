import { Module } from '@nestjs/common';
import { PartiesUsersService } from './parties-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartiesUsers } from './parties-users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartiesUsers])],
  providers: [PartiesUsersService],
  exports: [PartiesUsersService],
})
export class PartiesUsersModule {}
