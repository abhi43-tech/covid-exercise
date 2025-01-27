import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { abc, getAll, ISO_data } from './interface/alldata.interface';
// import { dateDTO } from './dto/date.dto';
import { json } from 'stream/consumers';

@Injectable()
export class TimeseriesService {
  private data = [];
  private countryData = [];
  private ISO_code: ISO_data[] = [];

  constructor() {
    this.data = JSON.parse(readFileSync('src/series.json').toString());
    this.countryData = JSON.parse(
      readFileSync('src/countries.json').toString(),
    );
    this.getCode();
  }

  public getData(): getAll[] {

    return Object.keys(this.data).map((country) => {
      const records = this.data[country];
      const totals = records.reduce(
        (acc, record) => {
          acc.confirmed += record.confirmed || 0;
          acc.deaths += record.deaths || 0;
          acc.recovered += record.recovered || 0;
          return acc;
        },
        { confirmed: 0, deaths: 0, recovered: 0 },
      );

      return {
        name: country,
        data: totals,
      };
    });
  }

  public getFilterData(from?: string, to?: string, iso?: string) {
    const fromDate = from ? this.parseDate(from) : null;
    const toDate = to ? this.parseDate(to) : null;

    const filteredCountries = iso
      ? this.ISO_code.filter(
          ({ code }) => code?.toLowerCase() === iso.toLowerCase(),
        ).map(({ name }) => name)
      : Object.keys(this.data);

    return filteredCountries.map((country) => {
      const records = this.data[country];

      const filteredRecords = records.filter((record) => {
        const recordDate = this.parseDate(record.date)?.getTime();
        return (
          (!fromDate || recordDate >= fromDate.getTime()) &&
          (!toDate || recordDate <= toDate.getTime())
        );
      });

      return {
        name: country,
        data: filteredRecords,
      };
    });
  }

  private parseDate(str: string): Date | null {
    const date = new Date(str);
    return isNaN(date.getTime())? null : date;
  }

  private getCode() {
    this.ISO_code = Object.entries(this.countryData).map(([name, {code}]) => ({
      name,
      code,
    }));
  }
}
