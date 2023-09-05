import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterReqDto } from './dto/user-register.req.dto';
import {
  ApiResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req) {
    return await this.userService.getUserById(req.user.id);
  }

  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Failed to register! try again' })
  registerUser(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    userRegisterDto: UserRegisterReqDto,
  ) {
    return this.userService.register(userRegisterDto);
  }
}
