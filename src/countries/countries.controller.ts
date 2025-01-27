import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';


@Controller('/countries')
export class CountriesController {
  constructor(private readonly CountriesService: CountriesService) {}

  @Get() 
  getCountries(@Query('name') name?: string, @Query('code') code?: string) {

    return this.CountriesService.getCountries(name, code);
  }
}
