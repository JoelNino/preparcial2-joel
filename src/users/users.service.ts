import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`El Usuario ${id} no se encontró`);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  create(name: string, email: string): Promise<User> {
    const user = this.userRepo.create({ name, email });
    return this.userRepo.save(user);
  }
}