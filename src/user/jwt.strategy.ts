import {Injectable, UnauthorizedException} from "@nestjs/common"
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.schema";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy){
  constructor(@InjectModel(User.name) private UserModel: Model<User>){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.Jwt_secret, // Corrected property name and environment variable usage
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    // console.log(id)
    const user = await this.UserModel.findById(id);
    if (!user) {
      throw new UnauthorizedException('Login first to access this page');
    }
    console.log("user",user)
    // console.log('strategy', user);
    return user;
  }
}
