import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan } from './travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private travelPlanRepo: Repository<TravelPlan>,
    private countriesService: CountriesService,
  ) {}

  async create(dto: CreateTravelPlanDto): Promise<TravelPlan> {
    await this.countriesService.getOrCreateCountry(dto.countryCode);
    const plan = this.travelPlanRepo.create(dto);
    return this.travelPlanRepo.save(plan);
  }



  findAll(): Promise<TravelPlan[]> {
    return this.travelPlanRepo.find();
  }

  async findOne(id: number): Promise<TravelPlan> {
    const plan = await this.travelPlanRepo.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`Plan ${id} no encontrado`);
    return plan;
  }

  async remove(id: number): Promise<{ message: string }> {
    const plan = await this.findOne(id);
    await this.travelPlanRepo.remove(plan);
    return { message: `Plan ${id} eliminado` };
  }
}