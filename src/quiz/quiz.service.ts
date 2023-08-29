import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from './schemas/quiz.schema';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/createQuiz.dto';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}

  getAll() {
    return this.quizModel
      .find({ isActive: true })
      .populate('questions')
      .populate({
        path: 'questions',
        populate: { path: 'options' },
      });
  }

  async getQuizById(id: string) {
    const quizes = await this.quizModel
      .findById(id)
      .populate('questions')
      .populate({
        path: 'questions',
        populate: { path: 'options' },
      });

    return quizes;
  }

  async create(quiz: CreateQuizDto) {
    return await this.quizModel.create(quiz);
  }
}
