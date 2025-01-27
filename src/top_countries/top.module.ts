import { Module } from "@nestjs/common";
import { TopService } from "./top.service";
import { TopController } from "./top.controller";
import { CasesService } from "src/cases/cases.service";

@Module({
  imports: [],
  controllers: [TopController],
  providers: [TopService, CasesService],
})

export class TopModule {}