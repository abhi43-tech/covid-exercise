import { MonthCasesService } from "src/monthwise/mcase.service";
import { ExcelController } from "./excel.controller";
import { ExcelService } from "./excel.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [ExcelService, MonthCasesService],
  controllers: [ExcelController],
})

export class ExcelModule {}