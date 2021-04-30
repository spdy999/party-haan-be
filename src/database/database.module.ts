import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { getOrmConfig } from './database-ormconfig.constant';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(getOrmConfig())],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
