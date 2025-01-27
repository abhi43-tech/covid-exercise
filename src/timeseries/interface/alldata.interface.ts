

export interface getAll {
  name: any;
  data: {
    confirmed: number,
    deaths: number,
    recovered: number
  },
}

export interface abc {
  name: string;
  data: {
    date: string,
    confirmed: number,
    deaths: number,
    recovered: number
  }[],
}

export interface ISO_data {
  name: string,
  code: string
}