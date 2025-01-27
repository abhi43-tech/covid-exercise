import { Module } from "@nestjs/common";
import { MonthCasesController } from "./mcase.controller";
import { MonthCasesService } from "./mcase.service";
import { CasesService } from "src/cases/cases.service";
import { CasesController } from "src/cases/cases.controller";

@Module({
  imports: [],
  controllers: [MonthCasesController],
  providers: [MonthCasesService],
  exports: [MonthCasesService],
})

export class MonthCasesModule {}