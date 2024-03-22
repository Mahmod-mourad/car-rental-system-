import { IsNumber, IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class CreateRentalDto {
  @IsNumber()
  carId: number;

  @IsNumber()
  customerId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  dailyRate: number;

  @IsNumber()
  totalPrice: number;

  @IsEnum(['daily', 'weekly', 'monthly', 'with_driver'])
  rentalType: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
