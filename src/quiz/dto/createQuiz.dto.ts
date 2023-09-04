import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({
    description: 'title of quiz',
    example: 'JavaScript Quiz Level 1',
  })
  @IsNotEmpty({ message: 'Quiz should have a title' })
  @Length(3, 255)
  title: string;

  @ApiProperty({
    description: 'description of quiz',
    example: 'bigginer level javascript questions',
  })
  @IsNotEmpty({ message: 'Quiz should have a description' })
  @Length(3)
  description: string;
}
