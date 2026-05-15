import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan, Expense } from './travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CountriesService } from '../countries/countries.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private travelPlanRepo: Repository<TravelPlan>,
    private countriesService: CountriesService,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateTravelPlanDto): Promise<TravelPlan> {
    await this.usersService.findOne(dto.userId);
    const upperCode = dto.countryCode.toUpperCase();
    await this.countriesService.getOrCreateCountry(upperCode);
    const plan = this.travelPlanRepo.create({
      ...dto,
      countryCode: upperCode,
      expenses: [],
    });
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

  async addExpense(id: number, dto: CreateExpenseDto): Promise<TravelPlan> {
    const plan = await this.findOne(id);
    const newExpense: Expense = {
      description: dto.description,
      amount: dto.amount,
      category: dto.category,
    };
    plan.expenses = [...plan.expenses, newExpense];
    return this.travelPlanRepo.save(plan);
  }
}
