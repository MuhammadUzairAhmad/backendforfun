import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"


export class CreateUserDto {
  @ApiProperty({description:"Email of the user"})
  @IsEmail({},{message:"Please enter valid email"})
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({description:"Password of the user"})
  @IsString()
  @MinLength(8,{message:'Password must be at least 8 charchaters'})
  @IsNotEmpty()
  readonly password: string;
  
  @ApiProperty({description:"usertype must be add"})
  @IsString()
  @IsNotEmpty()
  readonly usertype: string;

}
