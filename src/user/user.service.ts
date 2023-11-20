import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';
import { PasswordHasherService } from './password-hasher/password-hasher.service';
import { LoginRsp, SignUpRsp } from 'src/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private hasherService: PasswordHasherService,
    private jwtService:JwtService,
  ) {}

  async signup(userDto: CreateUserDto): Promise<SignUpRsp> {
    const user = await this.UserModel.findOne({ email: userDto.email });

    if (user) {
      throw new UnauthorizedException(
        'this user already exist with this email',
      );
    }
    const encryptedPassword = await this.hasherService.hashPassword(
      userDto.password,
    );
    // console.log("password",encryptedPassword)

    const newUser = new this.UserModel({
      email: userDto.email,
      password: encryptedPassword,
      usertype:userDto.usertype,
    });

    await newUser.save();
    return { email: newUser.email };
  }

  async login(doc: CreateUserDto): Promise<LoginRsp> {
    //verify user email
    const user = await this.UserModel.findOne({ email: doc.email });
    if(!user){
      throw new UnauthorizedException(
        'Invalid Email and Password'
      );
    }
    //verify user password
    const matchedPassword =  await this.hasherService.comparepassword(doc.password,user.password) 
    if(matchedPassword){
      //generate JSON web token
      const token = await this.jwtService.signAsync({
        email:user.email,
        id:user._id,
      })
      return { token , email: user.email , id: user._id }
    }
    else{
      throw new UnauthorizedException (
        'Invalid Email and Password'
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
