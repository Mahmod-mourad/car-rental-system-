import { IsString, IsNumber, IsOptional, IsEnum, IsArray, Min, Max } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export enum CarStatus {
  AVAILABLE = "available",
  SOLD = "sold",
  RENTED = "rented",
  MAINTENANCE = "maintenance",
}

export enum FuelType {
  GASOLINE = "gasoline",
  DIESEL = "diesel",
  HYBRID = "hybrid",
  ELECTRIC = "electric",
}

export enum Transmission {
  MANUAL = "manual",
  AUTOMATIC = "automatic",
  CVT = "cvt",
}

export class CreateCarDto {
  @ApiProperty({ description: "نموذج السيارة" })
  @IsString()
  model: string

  @ApiProperty({ description: "معرف العلامة التجارية" })
  @IsNumber()
  brandId: number

  @ApiProperty({ description: "معرف الفئة" })
  @IsNumber()
  categoryId: number

  @ApiProperty({ description: "سنة الصنع" })
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number

  @ApiProperty({ description: "السعر" })
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({ description: "المسافة المقطوعة" })
  @IsNumber()
  @Min(0)
  mileage: number

  @ApiProperty({ description: "نوع الوقود", enum: FuelType })
  @IsEnum(FuelType)
  fuelType: FuelType

  @ApiProperty({ description: "نوع ناقل الحركة", enum: Transmission })
  @IsEnum(Transmission)
  transmission: Transmission

  @ApiProperty({ description: "اللون" })
  @IsString()
  color: string

  @ApiProperty({ description: "الوصف", required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ description: "المواصفات", required: false })
  @IsOptional()
  @IsString()
  specifications?: string

  @ApiProperty({ description: "حالة السيارة", enum: CarStatus, default: CarStatus.AVAILABLE })
  @IsOptional()
  @IsEnum(CarStatus)
  status?: CarStatus

  @ApiProperty({ description: "صور السيارة", type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[]
}
