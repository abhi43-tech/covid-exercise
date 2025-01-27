import { Body, Controller, Get, ParseIntPipe, Query, Req, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import * as ExcelJS from 'exceljs';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get()
  async getData(@Res() res, @Query('year') year: number,@Query('code') code?: string[] ) {
    let workbook = await this.excelService.getData(year, code);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment;filename=' + 'total_cases.xlsx');

    workbook.xlsx.write(res)
  }
}