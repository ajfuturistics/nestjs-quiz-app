import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Option, OptionSchema } from './schemas/option.schema';
import { Question, QuestionSchema } from '../question/schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Option.name, schema: OptionSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
