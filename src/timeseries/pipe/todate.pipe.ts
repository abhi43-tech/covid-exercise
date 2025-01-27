
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class DatePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    return value
  }
}
