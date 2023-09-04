import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from './schemas/quiz.schema';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/createQuiz.dto';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}

  async getAll(limit, page) {
    const count = await this.quizModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    let current_page = page;
    if (page_total < page) {
      current_page = page_total;
    }
    const skip = (current_page - 1) * limit;

    const results = await this.quizModel
      .find({ isActive: true })
      .limit(limit)
      .skip(skip)
      .populate('questions')
      .populate({
        path: 'questions',
        populate: { path: 'options' },
      });

    return {
      data: results,
      page_total: page_total,
    };
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
