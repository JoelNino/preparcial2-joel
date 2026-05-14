import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface RestCountryResponse {
  name: { common: string };
  region: string;
  capital?: string[];
  population: number;
  flags?: { png: string };
}

@Injectable()
export class RestCountriesProvider {
  constructor(private httpService: HttpService) {}

  async getByCode(code: string): Promise<RestCountryResponse> {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    const response = await firstValueFrom(
      this.httpService.get<RestCountryResponse[]>(url),
    );
    return response.data[0];
  }
}