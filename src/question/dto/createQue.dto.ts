import { IsNotEmpty } from 'class-validator';

export class CreateQueDto {
  @IsNotEmpty({ message: 'question is required' })
  question: string;

  @IsNotEmpty({ message: 'Quiz id is required' })
  quizId: string;
}
