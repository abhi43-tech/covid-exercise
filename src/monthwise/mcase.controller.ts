import {
  Body,
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MonthCasesService } from './mcase.service';


@Controller('month')
export class MonthCasesController {
  constructor(private readonly monthcasesService: MonthCasesService) {}

  @Get()
  getData(@Body('from') from: string, @Body('to') to: string, @Query('greater') greater: number, @Query('less') less:number) {
    if(greater || less) return this.monthcasesService.getByNumbers(greater, from, to, less);
    if(from && to) return this.monthcasesService.getByDate(from, to);
    return this.monthcasesService.getData();
  }
}
