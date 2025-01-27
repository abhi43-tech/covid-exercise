import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { abc, getAll } from 'src/timeseries/interface/alldata.interface';

@Injectable()
export class CasesService {
  private data = [];

  constructor() {
    this.data = JSON.parse(readFileSync('src/timeseries.json').toString());
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

  public getbyDate(from: string, to: string) {
    let result: getAll[] = [];
    const fromDate = this.parseDate(from);
    const toDate = this.parseDate(to);

    if (fromDate.getTime() > toDate.getTime())
      throw new BadRequestException(
        `Enter a 'To' date greater than the 'From' date.`
      );

    return Object.keys(this.data).map((country) => {
      const records = this.data[country];

      const filteredRecords = records.filter((record) => {
        const recordDate = this.parseDate(record.date)?.getTime();
        return (
          (!fromDate || (recordDate && recordDate >= fromDate.getTime())) &&
          (!toDate || (recordDate && recordDate <= toDate.getTime()))
        );
      });

      const totals = filteredRecords.reduce(
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

  public getByNumbers(
    greater?: number,
    from?: string,
    to?: string,
    less?: number,
  ) {
    let data = from && to ? this.getbyDate(from, to) : this.getData();
    let filterData;
    if(greater && less) {
      filterData = data.filter((item) => {
        const recover = item['data']['recovered'];
        if (recover > greater && recover < less) return true;
        return false;
      })
      return filterData;
    }
    filterData = less
      ? data.filter((item) => {
          const recover = item['data']['recovered'];
          if (less && recover < less) return true;
          return false;
        })
      : data.filter((item) => {
          const recover = item['data']['recovered'];
          if (greater && recover > greater) return true;
          return false;
        });

    return filterData;
  }

  private parseDate(str: string): Date | null {
    const date = new Date(str);
    if (isNaN(date.getTime()))
      throw new BadRequestException('Enter valid Date');
    return date;
  }
}
