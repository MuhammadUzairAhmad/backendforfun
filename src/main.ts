import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Create a NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Use the ValidationPipe as global middleware
  // to automatically validate incoming data before the API routes are executed.
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('My Appication')
    .setDescription('My Appication is an api containing all routes for the app')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: '*', // Allow requests from any origin (you can specify specific origins)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'], // Allowed HTTP methods
  });

  // Start the NestJS application and listen on port 3000
  await app.listen(3000);
}

// Start the NestJS application
bootstrap();


// 1.Add Doc for model properties 
// 2.Add tags
// 3.Add Responses
// 4.Add Bearer Auth
