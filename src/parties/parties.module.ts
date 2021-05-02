import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parties } from './parties.entity';
import { PartiesUsersModule } from 'src/parties-users/parties-users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Parties]), PartiesUsersModule],
  providers: [PartiesService],
  controllers: [PartiesController],
  exports: [PartiesService],
})
export class PartiesModule {}
