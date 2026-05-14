import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { RestCountriesProvider } from './restcountries.provider';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepo: Repository<Country>,
    private restCountriesProvider: RestCountriesProvider,
  ) {}

  async getOrCreateCountry(code: string): Promise<Country> {
    const upperCode = code.toUpperCase();

    const found = await this.countryRepo.findOne({
      where: { alpha3Code: upperCode },
    });
    if (found) return found;

    const data = await this.restCountriesProvider.getByCode(upperCode).catch(() => {
      throw new NotFoundException(`País con código ${upperCode} no encontrado`);
    });

    const country = this.countryRepo.create({
      alpha3Code: upperCode,
      name: data.name.common,
      region: data.region,
      capital: data.capital?.[0] ?? 'N/A',
      population: data.population,
      flagUrl: data.flags?.png ?? '',
    });

    return this.countryRepo.save(country);
  }
}