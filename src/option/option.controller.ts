import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOptionDto } from './dto/createOption.dto';
import { OptionService } from './option.service';

@Controller('option')
export class OptionController {
  constructor(private optionService: OptionService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createOption(@Body() optionData: CreateOptionDto) {
    return this.optionService.create(optionData);
  }
}
