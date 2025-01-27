import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { TimeseriesModule } from './timeseries/timeseries.module';
import { CasesModule } from './cases/cases.module';
import { MonthCasesModule } from './monthwise/mcase.module';
import { TopModule } from './top_countries/top.module';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [
    CountriesModule,
    TimeseriesModule,
    CasesModule,
    MonthCasesModule,
    TopModule,
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
