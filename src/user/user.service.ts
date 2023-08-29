import { Injectable } from '@nestjs/common';
import { UserRegisterReqDto } from './dto/user-register.req.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(userRegisterDto: UserRegisterReqDto) {
    const { name, email, password, confirm } = userRegisterDto;

    if (password !== confirm) {
      console.log('err');
    }

    const user = await this.userModel.create({
      name,
      email,
      password,
    });

    return user;
  }
}
