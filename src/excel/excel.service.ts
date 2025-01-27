import { Injectable } from '@nestjs/common';
import { MonthCasesService } from 'src/monthwise/mcase.service';
import * as excelJs from 'exceljs';
import { readFileSync } from 'fs';

@Injectable()
export class ExcelService {
  private data;
  private ISO_code;
  private countryData = [];
  constructor(private readonly monthService: MonthCasesService) {
    this.data = this.monthService.getData();
    this.countryData = JSON.parse(
      readFileSync('src/countries.json').toString(),
    );
    this.getCode();
  }

  public async getData(year?: number, countryCode?: string[]) {
    let filterData = year
      ? this.data.filter((values) => values.year === Number(year))
      : this.data;

    const filteredCountries = countryCode
      ? this.ISO_code.filter(({ code }) => countryCode.includes(code)).map(
          ({ name }) => name,
        )
      : Object.keys(this.data);

    if(countryCode){filterData = filterData.filter((values) =>
      filteredCountries.includes(values.country),
    );}

    return await this.getWorkbook(filterData);
  }

  private async getWorkbook(data) {
    const workbook = new excelJs.Workbook();
    workbook.creator = 'User';
    workbook.lastModifiedBy = 'you';
    workbook.created = new Date(2025, 1, 23);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2025, 1, 25);

    const sheet = workbook.addWorksheet('Total Cases');

    workbook.eachSheet((sheet) => {
      console.log(sheet.id);
    });

    sheet.columns = [
      { header: 'Country', key: 'country', width: 15 },
      { header: 'Month', key: 'month', width: 15 },
      { header: 'Year', key: 'year', width: 15 },
      { header: 'Confirmed', key: 'confirmed', width: 15 },
      { header: 'Deaths', key: 'deaths', width: 15 },
      { header: 'Recovered', key: 'recovered', width: 15 },
    ];

    await data.map((values) => {
      sheet.addRow({
        country: values.country,
        month: values.month,
        year: values.year,
        confirmed: values.data.confirmed,
        deaths: values.data.deaths,
        recovered: values.data.recovered,
      });
    });

    return workbook;
  }

  private getCode() {
    this.ISO_code = Object.entries(this.countryData).map(
      ([name, { code }]) => ({
        name,
        code,
      }),
    );
  }
}
