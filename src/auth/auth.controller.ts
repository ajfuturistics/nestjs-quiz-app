import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Request() req) {
    return req.user;
  }
}
