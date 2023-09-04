import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'Name of user', example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Email of user', example: 'johndoe@gmail.com' })
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({ description: 'Hashed Password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Hashed Password', enum: ['admin', 'user'] })
  @Prop({ default: 'user', enum: ['admin', 'user'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  next();
});
