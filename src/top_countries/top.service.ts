import { Injectable } from '@nestjs/common';
import { CasesService } from 'src/cases/cases.service';
import { countryDTO } from './dto/country.dto';

@Injectable()
export class TopService {
  private data;
  constructor(private readonly caseService: CasesService) {}

  public getData(top?: countryDTO, from?: string, to?: string) {
    if (from && to) this.data = this.caseService.getbyDate(from, to);
    else this.data = this.caseService.getData();
    const sortedData = [...this.data];

    sortedData.sort((countryA, countryB) => {
      const confirmedA = countryA.data.confirmed;
      const confirmedB = countryB.data.confirmed;

      if (confirmedA > confirmedB) {
        return -1;
      } else if (confirmedA < confirmedB) {
        return 1;
      } else {
        return 0;
      }
    });
    let topCountries = sortedData.slice(0, Number(top) ? Number(top) : 3);

    return topCountries;
  }
}
