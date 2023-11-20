import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginRsp, SignUpRsp } from 'src/types';
import { AuthGuard } from '@nestjs/passport';
import { AdminRolesGuard } from './jwt.admin.guard';
import { UserRolesGuard } from './jwt.user.guard';
import { ApiOkResponse, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('User Module API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiResponse({type: SignUpRsp, status: 201 })
  async signUp(@Body() user: CreateUserDto):Promise<SignUpRsp> {
    return await this.userService.signup(user);
  }
  @Post('login')
  async login(@Body() user: CreateUserDto):Promise<LoginRsp> {
    return await this.userService.login(user);
  }

  @Post('profile')
  @UseGuards(AuthGuard(), AdminRolesGuard)
  // @UseGuards(AdminRolesGuard)
  async profile(@Req() req) {
    return req.user;
  }
  
  @Post('profileuser')
  @UseGuards(AuthGuard() , UserRolesGuard)
  // @UseGuards(UserRolesGuard)
  async profileuser(@Request() req) {
    return req.user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
