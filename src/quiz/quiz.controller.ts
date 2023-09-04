import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import {
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Quiz } from './schemas/quiz.schema';

@ApiTags('Quiz')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @ApiResponse({
    status: 200,
    description: 'Paginated Quiz response',
    schema: {
      allOf: [
        {
          properties: {
            data: {
              type: 'array',
              example: [],
            },
            page_total: {
              type: 'number',
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    schema: {
      properties: {
        message: {
          type: 'string',
        },
        statusCode: {
          type: 'number',
        },
      },
    },
  })
  @ApiQuery({ name: 'page', description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', description: 'limit quiz', example: 10 })
  @Get()
  getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit,
  ) {
    return this.quizService.getAll(limit, page);
  }

  @ApiOkResponse({ description: 'Get by id', type: Quiz })
  @Get('/:quizId')
  getQuizById(@Param('quizId') quizId: string) {
    return this.quizService.getQuizById(quizId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'Create new Quiz', type: Quiz })
  createQuiz(@Body() quizData: CreateQuizDto) {
    return this.quizService.create(quizData);
  }
}
