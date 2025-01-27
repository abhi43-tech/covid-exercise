import { Module } from "@nestjs/common";
import { TimeseriesController } from "./timeseries.controller";
import { TimeseriesService } from "./timeseries.service";

@Module({
  imports: [],
  controllers: [TimeseriesController],
  providers: [TimeseriesService],
})

export class TimeseriesModule {}