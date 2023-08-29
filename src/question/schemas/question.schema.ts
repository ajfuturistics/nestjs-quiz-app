import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Quiz } from '../../quiz/schemas/quiz.schema';
import { Option } from '../../option/schemas/option.schema';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' })
  quiz: Quiz;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }] })
  options: Option[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
