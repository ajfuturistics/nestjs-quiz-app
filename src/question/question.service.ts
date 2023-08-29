import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';
import { CreateQueDto } from './dto/createQue.dto';
import { Quiz } from '../quiz/schemas/quiz.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private queModel: Model<Question>,
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
  ) {}

  async create(queData: CreateQueDto): Promise<Question> {
    const quiz = await this.quizModel.findById(queData.quizId);

    const question = await this.queModel.create({
      ...queData,
      quiz: queData.quizId,
    });

    quiz.questions.push(question);
    await quiz.save();

    return question;
  }
}
