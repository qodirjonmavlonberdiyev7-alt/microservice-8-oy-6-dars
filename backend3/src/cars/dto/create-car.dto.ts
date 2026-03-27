import { IsString, IsInt, IsNumber, IsBoolean, IsOptional, Min, Max, Length } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @Length(2, 100)
  brand: string;

  @IsString()
  @Length(1, 100)
  model: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  @Length(3, 50)
  color: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  mileage?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}