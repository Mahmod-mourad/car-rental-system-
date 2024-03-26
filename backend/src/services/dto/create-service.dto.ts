import { IsString, IsNumber, IsEnum, IsBoolean, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(['maintenance', 'repair', 'beauty', 'inspection', 'insurance', 'finance'])
  category: string;

  @IsNumber()
  estimatedPrice: number;

  @IsOptional()
  @IsNumber()
  estimatedDuration?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
