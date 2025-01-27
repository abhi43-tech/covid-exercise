import {
  Body,
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get()
  getData(
    @Body('from') from: string,
    @Body('to') to: string,
    @Query('greater') greater: number,
    @Query('less') less: number,
  ) {
    if (greater || less) return this.casesService.getByNumbers(greater, from, to, less);
    if (from && to) return this.casesService.getbyDate(from, to);
    return this.casesService.getData();
  }
} 
