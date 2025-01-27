import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class CountriesService {
  private countries = [];

  constructor() {
    this.countries = JSON.parse(readFileSync('src/countries.json').toString());
  }

  public getCountries(name?: string, code?: string) {
    let result = {...this.countries};

    if(name) {
      name = name.toLowerCase();
      const countryNames = Object.keys(result).filter((key) => key.toLowerCase().includes(name));
      result = Object.entries(result).filter(([key]) => countryNames.includes(key));
      // console.log(result)
    }

    if(code) {
      code=code.toLowerCase();
      
      result = Object.entries(result).filter(([key, details]) => details.code && details.code.toLowerCase().includes(code))
      // console.log(result)
    }

    return result;
  }
}
// if (name) {
//   name = name.toLowerCase();
//   const countryNames = Object.keys(this.countries).filter((key) =>
//     key.toLowerCase().includes(name),
//   );
//   countryList = Object.entries(this.countries).filter(([key]) =>
//     countryNames.includes(key),
//   );

//   return countryList
// }

// if (code) {
//   code = code.toLowerCase();
//   const countryList = Object.entries(this.countries).filter(
//     ([_, details]) =>
//       details.code && details.code.toLowerCase().includes(code),
//   );

//   return Object.fromEntries(countryList);
// }

// return this.countries;
// }
