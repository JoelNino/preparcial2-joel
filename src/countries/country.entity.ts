import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn()
  alpha3Code!: string;

  @Column()
  name!: string;

  @Column()
  region!: string;

  @Column()
  capital!: string;

  @Column()
  population!: number;

  @Column()
  flagUrl!: string;
}