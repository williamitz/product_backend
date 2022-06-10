import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AppModule.port, () => {
    console.log(`Servidor corriendo en puerto: ${AppModule.port} ✅`);
    console.log(`Entorno: ${AppModule.mode} ❕`);
  });
}
bootstrap();
