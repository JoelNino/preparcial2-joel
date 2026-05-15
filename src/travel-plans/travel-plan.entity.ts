import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface Expense {
  description: string;
  amount: number;
  category: string;
}

@Entity()
export class TravelPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  startDate!: string;

  @Column()
  endDate!: string;

  @Column()
  countryCode!: string;

  @Column()
  userId!: number;

  @Column({ type: 'simple-json', default: '[]' })
  expenses!: Expense[];
}
