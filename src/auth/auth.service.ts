import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new BadRequestException();

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) throw new UnauthorizedException();

    return user;
  }

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user._id,
      }),
    };
  }
}
