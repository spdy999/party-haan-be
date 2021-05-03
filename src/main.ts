import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT);
};

void bootstrap();
