import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthException extends HttpException {
  constructor() {
    super('Login to access this resource', HttpStatus.UNAUTHORIZED);
  }
}
