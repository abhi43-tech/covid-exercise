import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: number, metadata: ArgumentMetadata) {
    try {
      if (value > 15) throw new Error();
      return value;
    } catch (error) {
      throw new BadRequestException('Number must be less than 15.');
    }
  }
}
