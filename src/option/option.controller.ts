import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateOptionDto } from './dto/createOption.dto';
import { OptionService } from './option.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Quiz')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@Controller('option')
export class OptionController {
  constructor(private optionService: OptionService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createOption(@Body() optionData: CreateOptionDto) {
    return this.optionService.create(optionData);
  }
}
