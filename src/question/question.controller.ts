import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQueDto } from './dto/createQue.dto';
import { Question } from './schemas/question.schema';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Quiz')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async saveQuestion(@Body() queData: CreateQueDto): Promise<Question> {
    return await this.questionService.create(queData);
  }
}
