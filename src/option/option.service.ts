import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Option } from './schemas/option.schema';
import { Model } from 'mongoose';
import { Question } from '../question/schemas/question.schema';
import { CreateOptionDto } from './dto/createOption.dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Option.name) private optionModel: Model<Option>,
    @InjectModel(Question.name) private queModel: Model<Question>,
  ) {}

  async create(optionData: CreateOptionDto) {
    const question = await this.queModel.findById(optionData.question);

    const newOption = await this.optionModel.create(optionData);

    question.options.push(newOption);
    await question.save();

    return newOption;
  }
}
