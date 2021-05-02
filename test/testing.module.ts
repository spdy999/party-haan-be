import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
})
/**
 * The Testing Module provides
 * Utility functions for easier testing
 */
export class TestingModule {}
