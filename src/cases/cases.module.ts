import { Module } from "@nestjs/common";
import { CasesController } from "./cases.controller";
import { CasesService } from "./cases.service";

@Module({
  imports: [],
  controllers: [CasesController],
  providers: [CasesService],
  exports: [CasesService],
})

export class CasesModule {}