import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Question } from '../../question/schemas/question.schema';
import { ApiProperty } from '@nestjs/swagger';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema()
export class Quiz {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] })
  questions: Question[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
