import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    // Load environment variables and make them available globally
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // Configure Mongoose asynchronously using a factory function
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URL,
      }),
    }),

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  // Implement the OnApplicationBootstrap interface to define the onApplicationBootstrap method
  async onApplicationBootstrap() {
    try {
      // Attempt to establish the MongoDB connection
       mongoose.connection;
      console.log('MongoDB connected successfully');
    } catch (error) {
      // Log an error message if there is an issue with the connection
      console.error('MongoDB connection error:', error);
    }
  }
}
