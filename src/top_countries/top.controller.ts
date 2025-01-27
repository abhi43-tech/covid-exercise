import { Body, Controller, Get, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TopService } from "./top.service";
import { countryDTO } from "./dto/country.dto";
import { ZodValidationPipe } from "./zod/validation.pipe";

@Controller('top')
export class TopController {
  constructor(private readonly topService: TopService) {}

  @Get() 
  @UsePipes(new ZodValidationPipe(countryDTO))
  @UsePipes(new ValidationPipe())
  getData(@Query('top') top: countryDTO, @Body('from') from?:string, @Body('to') to?:string) {

    return this.topService.getData(top,from,to);
  }
}