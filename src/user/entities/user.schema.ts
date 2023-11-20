import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    unique: true, message: 'user with this email is already here',
    required:true })
  email: string;
  @Prop({required:true})
  password: string;
  @Prop({required:true , default:"user"})
  usertype: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
