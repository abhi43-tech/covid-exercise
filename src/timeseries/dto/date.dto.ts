

import { IsDate, IsDateString, IsNotEmpty, IsString, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class fromDTO {

  @IsDateString()
  from: string
}