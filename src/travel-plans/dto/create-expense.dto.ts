import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateExpenseDto {
  @IsString({ message: 'La descripcion debe ser texto' })
  @IsNotEmpty({ message: 'La descripcinn no puede estar vacia' })
  description!: string;

  @IsNumber({}, { message: 'El monto debe ser un nmero' })
  @IsPositive({ message: 'El monto debe estar positivo' })
  amount!: number;

  @IsString({ message: 'La categoria tiene que ser ser texto' })
  @IsNotEmpty({ message: 'La categoría no puede ser vacio' })
  category!: string;
}
