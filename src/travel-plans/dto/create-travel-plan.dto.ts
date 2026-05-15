import {
  IsString,
  IsNotEmpty,
  Matches,
  Length,
  MinLength,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateTravelPlanDto {
  @IsString({ message: 'El título debe ser texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title!: string;

  @IsString({ message: 'La fecha de inicio debe ser texto' })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe tener formato YYYY-MM-DD. Ejemplo: 2026-06-01',
  })
  startDate!: string;

  @IsString({ message: 'La fecha de fin debe ser texto' })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe tener formato YYYY-MM-DD. Ejemplo: 2026-12-31',
  })
  endDate!: string;

  @IsString({ message: 'El código del país debe ser texto' })
  @IsNotEmpty({ message: 'El código del país es obligatorio' })
  @Length(3, 3, { message: 'El código del país debe ser exactamente 3 letras. Ejemplo: COL' })
  @Matches(/^[A-Za-z]{3}$/, { message: 'El código del país solo debe contener letras' })
  countryCode!: string;

  @IsNumber({}, { message: 'El userId debe ser un numero' })
  @IsPositive({ message: 'El userId debe ser positivo' })
  userId!: number;
}
