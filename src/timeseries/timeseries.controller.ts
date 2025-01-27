import { Body, Controller, Get, Query, UsePipes, ValidationPipe} from "@nestjs/common";
import { TimeseriesService } from "./timeseries.service";
import { DatePipe } from "./pipe/todate.pipe";
// import { dateDTO } from "./dto/date.dto";

@Controller('timeseries')
export class TimeseriesController {

  constructor(private readonly timeseriesService: TimeseriesService) {}

  @Get()
  getData(@Body('from') from?: string, @Body('to') to?: string, @Query('iso') iso?: string) {
    if(from && to || iso) return this.timeseriesService.getFilterData(from, to, iso)
    return this.timeseriesService.getData()
  }
}
