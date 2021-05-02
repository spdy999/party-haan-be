import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parties } from './parties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parties])],
  providers: [PartiesService],
  controllers: [PartiesController],
  exports: [PartiesService],
})
export class PartiesModule {}
