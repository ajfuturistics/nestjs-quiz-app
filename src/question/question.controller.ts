import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQueDto } from './dto/createQue.dto';
import { Question } from './schemas/question.schema';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async saveQuestion(@Body() queData: CreateQueDto): Promise<Question> {
    return await this.questionService.create(queData);
  }
}
