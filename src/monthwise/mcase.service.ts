import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { countObj } from './interface/first.interface';

@Injectable()
export class MonthCasesService {
  private data = [];
  constructor() {
    this.data = JSON.parse(readFileSync('src/series.json').toString());
  }

  public getData() {
    let result: countObj[] = [];

    for (let country of Object.keys(this.data)) {
      let month = this.parseDate(this.data[country][0]['date']).getMonth();
      let year = this.parseDate(this.data[country][0]['date']).getFullYear();
      let total = { confirmed: 0, deaths: 0, recovered: 0 };

      for (let i = 0; i < this.data[country].length; i++) {
        let d_month = this.parseDate(this.data[country][i]['date']).getMonth();
        let d_year = this.parseDate(
          this.data[country][i]['date'],
        ).getFullYear();

        if (d_month == month && d_year == year) {
          total.confirmed += this.data[country][i]['confirmed'] ?? 0;
          total.deaths += this.data[country][i]['deaths'] ?? 0;
          total.recovered += this.data[country][i]['recovered'] ?? 0;
        } else {
          result.push({
            country: country,
            month: month,
            year: year,
            data: { ...total },
          });
          month = d_month;
          year = d_year;
          (total.confirmed = 0), (total.deaths = 0), (total.recovered = 0);
        }
      }
      result.push({
        country: country,
        month: month,
        year: year,
        data: { ...total },
      });
    }

    // console.log(this.data);
    return result;
  }

  public getByDate(from: string, to: string) {
    let result: countObj[] = [];
  const fromDate = this.parseDate(from);
  const toDate = this.parseDate(to);

  if(fromDate.getTime() > toDate.getTime()) throw new BadRequestException(`Enter a 'To' date greater than the 'From' date.`);

  for (let country of Object.keys(this.data)) {
    // Filter the data for the given country within the date range
    const filteredData = this.data[country].filter((entry) => {
      const entryDate = this.parseDate(entry.date).getTime();
      return entryDate >= fromDate.getTime() && entryDate <= toDate.getTime();
    });

    if (filteredData.length === 0) continue; // Skip countries with no data in range

    let month = this.parseDate(filteredData[0].date).getMonth();
    let year = this.parseDate(filteredData[0].date).getFullYear();
    let total = { confirmed: 0, deaths: 0, recovered: 0 };

    for (let i = 0; i < filteredData.length; i++) {
      let d_month = this.parseDate(filteredData[i].date).getMonth();
      let d_year = this.parseDate(filteredData[i].date).getFullYear();

      if (d_month === month && d_year === year) {
        total.confirmed += filteredData[i].confirmed ?? 0;
        total.deaths += filteredData[i].deaths ?? 0;
        total.recovered += filteredData[i].recovered ?? 0;
      } else {
        // Push the aggregated result for the previous month/year
        result.push({
          country: country,
          month: month,
          year: year,
          data: { ...total },
        });

        month = d_month;
        year = d_year;
        total = { confirmed: 0, deaths: 0, recovered: 0 };
        total.confirmed += filteredData[i].confirmed ?? 0;
        total.deaths += filteredData[i].deaths ?? 0;
        total.recovered += filteredData[i].recovered ?? 0;
      }
    }

    result.push({
      country: country,
      month: month,
      year: year,
      data: { ...total },
    });
  }

  return result;
  }

  public getByNumbers(
    greater?: number,
    from?: string,
    to?: string,
    less?: number,
  ) {
    let data = from && to ? this.getByDate(from, to) : this.getData();
    let filterData;
    if(greater && less) {
      filterData = data.filter((item) => {
        const recover = item['data']['recovered'];
        if (recover >= greater && recover <= less) return true;
        return false;
      })
      return filterData;
    }
    filterData = less
      ? data.filter((item) => {
          const recover = item['data']['recovered'];
          if (less && recover <= less) return true;
          return false;
        })
      : data.filter((item) => {
          const recover = item['data']['recovered'];
          if (greater && recover >= greater) return true;
          return false;
        });

    return filterData;
  }

  private parseDate(str: string): Date | null {
    const date = new Date(str);

    if(isNaN(date.getTime()))
      throw new BadRequestException('Enter valid Date');

    return date;
  }
}
