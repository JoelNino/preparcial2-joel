import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Country } from './country.entity';
import { CountriesService } from './countries.service';
import { RestCountriesProvider } from './restcountries.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), HttpModule],
  providers: [CountriesService, RestCountriesProvider],
  exports: [CountriesService],
})
export class CountriesModule {}