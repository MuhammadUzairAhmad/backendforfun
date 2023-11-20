import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.schema';
import { PasswordHasherService } from './password-hasher/password-hasher.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategyService } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('Jwt_secret'),
          signOptions: {
            expiresIn: config.get<string | number>('Jwt_exp'),
          },
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PasswordHasherService, JwtStrategyService],
  // exports:[JwtStrategyService]
})
export class UserModule {}
