import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}