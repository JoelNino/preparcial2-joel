import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlan } from './travel-plan.entity';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlansController } from './travel-plans.controller';
import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [TypeOrmModule.forFeature([TravelPlan]), CountriesModule],
  providers: [TravelPlansService],
  controllers: [TravelPlansController],
})
export class TravelPlansModule {}