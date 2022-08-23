import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //permite apenas os dados q estão no dto
      whitelist: true,
      //se passar dado q n ta no dto via payload, bate erro
      forbidNonWhitelisted: true,
      //transforma o payload em dto
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
