import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  carId: number;

  @IsNumber()
  customerId: number;

  @IsNumber()
  totalPrice: number;

  @IsEnum(['cash', 'card', 'installment', 'bank_transfer'])
  paymentMethod: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
