import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.listen(3333).then(() => {
    console.log('[Purchases] HTTP server running!');
  });
}
bootstrap();
