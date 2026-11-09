
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { StatusEnum } from '../enums/status.enum.js';
import { TODO_VALIDATION_MESSAGES } from './validation-messages.js';

export class CreateTodoDto {
  @IsString({ message: TODO_VALIDATION_MESSAGES.name.string })
  @IsNotEmpty({ message: TODO_VALIDATION_MESSAGES.name.required })
  @MinLength(3, { message: TODO_VALIDATION_MESSAGES.name.minLength })
  @MaxLength(10, { message: TODO_VALIDATION_MESSAGES.name.maxLength })
  name: string;

  @IsString({ message: TODO_VALIDATION_MESSAGES.description.string })
  @IsNotEmpty({ message: TODO_VALIDATION_MESSAGES.description.required })
  @MinLength(10, {
    message: TODO_VALIDATION_MESSAGES.description.minLength,
  })
  description: string;

  @IsEnum(StatusEnum, {
    message: TODO_VALIDATION_MESSAGES.status.invalid,
  })
  status: StatusEnum;
}
