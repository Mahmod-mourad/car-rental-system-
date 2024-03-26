import { IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  serviceId: number;

  @IsNumber()
  carId: number;

  @IsNumber()
  customerId: number;

  @IsDateString()
  appointmentDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
