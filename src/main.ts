import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import appConfig from './app/config/app.config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig(app);

  if (process.env.NODE_ENV === 'production') {
    // helmet -> cabeçalhos de segurança no protocolo HTTP
    app.use(helmet());

    // cors -> permitir que outro domínio faça requests na sua aplicação
    app.enableCors({
      origin: 'https://meuapp.com.br',
    });
  }

  const documentBuilderConfig = new DocumentBuilder()
    .setTitle('Recados API')
    .setDescription('Envie recados para seus amigos e familiares')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilderConfig);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
