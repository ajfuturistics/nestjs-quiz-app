import { Injectable } from '@nestjs/common';
import { UserRegisterReqDto } from './dto/user-register.req.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(userRegisterDto: UserRegisterReqDto) {
    const { name, email, password, confirm, role } = userRegisterDto;

    if (password !== confirm) {
      console.log('err');
    }

    const user = await this.userModel.create({
      name,
      email,
      password,
      role,
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    return user;
  }
}
